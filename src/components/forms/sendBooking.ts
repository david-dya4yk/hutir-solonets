"use server";

import { PRICE_PER_NIGHT } from "@/content/site";
import { formatPrice } from "@/locales/config";

export type BookingRequest = {
  readonly name: string;
  readonly phone: string;
  readonly checkin: string;
  readonly checkout: string;
  readonly cottage: string;
  readonly comment: string;
  readonly locale: string;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;

const clean = (v: unknown, max: number): string =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

const formatDate = (iso: string): string => iso.split("-").reverse().join(".");

const escape = (v: string): string =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const row = (icon: string, label: string, value: string): string =>
  `${icon} <b>${label}:</b> ${escape(value)}`;

const nights = (a: string, b: string): number =>
  Math.round((Date.parse(b) - Date.parse(a)) / 86_400_000);

export async function sendBooking(input: BookingRequest): Promise<boolean> {
  const token = process.env["TELEGRAM_BOT_TOKEN"];
  const chatId = process.env["TELEGRAM_CHAT_ID"];
  if (token === undefined || token === "" || chatId === undefined || chatId === "") {
    console.error("sendBooking: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
    return false;
  }

  const name = clean(input.name, 100);
  const phone = clean(input.phone, 30);
  const checkin = clean(input.checkin, 10);
  const checkout = clean(input.checkout, 10);
  const cottage = clean(input.cottage, 80);
  const comment = clean(input.comment, 1000);
  const locale = clean(input.locale, 5);
  if (
    name === "" ||
    phone.replace(/\D/g, "").length < 10 ||
    !DATE.test(checkin) ||
    !DATE.test(checkout) ||
    nights(checkin, checkout) <= 0
  ) {
    return false;
  }

  const count = nights(checkin, checkout);
  const text = [
    "🏡 <b>Нова заявка на бронювання</b>",
    "",
    row("👤", "Ім’я", name),
    row("📞", "Телефон", phone),
    "",
    row("📅", "Дати", `${formatDate(checkin)} — ${formatDate(checkout)}`),
    row("🌙", "Ночей", String(count)),
    row("🏠", "Котедж", cottage),
    row("💰", "Орієнтовно", formatPrice("uk", count * PRICE_PER_NIGHT)),
    ...(comment === "" ? [] : ["", row("💬", "Коментар", comment)]),
    "",
    row("🌐", "Мова сайту", locale.toUpperCase()),
  ].join("\n");

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      console.error("sendBooking: Telegram responded", res.status, await res.text());
    }
    return res.ok;
  } catch (e) {
    console.error("sendBooking: request failed", e);
    return false;
  }
}
