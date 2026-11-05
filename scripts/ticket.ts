import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

export const TICKET_PREFIX = "FUR";
export const TICKETS_DIR = join(process.cwd(), "docs", "tickets");
export const TICKET_TYPES = ["bug", "feature", "chore", "ci", "docs", "design", "a11y", "perf"] as const;
export const TICKET_STATUSES = ["backlog", "in-progress", "blocked", "done", "wont-do"] as const;
export const TICKET_PRIORITIES = ["P1", "P2", "P3"] as const;

const TICKET_ID_PATTERN = new RegExp(`^${TICKET_PREFIX}-(\\d{4,})`);
const USAGE = 'Usage: bun run ticket:new --title "..." [--type bug] [--priority P2] | bun run ticket:list [--status backlog]';

export interface TicketMeta {
  id: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  created: string;
  file: string;
}

export function formatTicketId(ticketNumber: number): string {
  return `${TICKET_PREFIX}-${String(ticketNumber).padStart(4, "0")}`;
}

export function parseTicketNumber(fileNameOrId: string): number | null {
  const match = TICKET_ID_PATTERN.exec(fileNameOrId);
  return match ? Number(match[1]) : null;
}

export function nextTicketId(existingFileNames: string[]): string {
  const ticketNumbers = existingFileNames
    .map(parseTicketNumber)
    .filter((ticketNumber): ticketNumber is number => ticketNumber !== null);
  const highestTicketNumber = ticketNumbers.length ? Math.max(...ticketNumbers) : 0;
  return formatTicketId(highestTicketNumber + 1);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");
}

export function parseFrontmatter(markdown: string): Record<string, string> {
  const frontmatterBody = /^---\n([\s\S]*?)\n---/.exec(markdown)?.[1];
  if (frontmatterBody === undefined) return {};
  const fields: Record<string, string> = {};
  for (const line of frontmatterBody.split("\n")) {
    const separatorIndex = line.indexOf(":");
    if (separatorIndex > 0) {
      fields[line.slice(0, separatorIndex).trim()] = line.slice(separatorIndex + 1).trim();
    }
  }
  return fields;
}

export function renderTicket(meta: Omit<TicketMeta, "file">): string {
  return `---
id: ${meta.id}
title: ${meta.title}
type: ${meta.type}
status: ${meta.status}
priority: ${meta.priority}
created: ${meta.created}
---

## Problem

## Research

## Acceptance criteria

- [ ]

## Notes
`;
}

function listTicketFileNames(): string[] {
  if (!existsSync(TICKETS_DIR)) return [];
  return readdirSync(TICKETS_DIR)
    .filter((fileName) => parseTicketNumber(fileName) !== null)
    .sort();
}

function readAllTickets(): TicketMeta[] {
  return listTicketFileNames().map((file) => {
    const fields = parseFrontmatter(readFileSync(join(TICKETS_DIR, file), "utf-8"));
    return {
      id: fields.id ?? "",
      title: fields.title ?? "",
      type: fields.type ?? "",
      status: fields.status ?? "",
      priority: fields.priority ?? "",
      created: fields.created ?? "",
      file,
    };
  });
}

function readFlagValue(args: string[], flagName: string): string | undefined {
  const flagIndex = args.indexOf(`--${flagName}`);
  return flagIndex >= 0 ? args[flagIndex + 1] : undefined;
}

function requireAllowedValue<T extends readonly string[]>(value: string, allowedValues: T, flagName: string): T[number] {
  if (!allowedValues.includes(value)) {
    throw new Error(`--${flagName} must be one of: ${allowedValues.join(", ")} (got "${value}")`);
  }
  return value as T[number];
}

function todayAsIsoDate(): string {
  return new Date().toISOString().slice(0, 10);
}

function createTicket(args: string[]): void {
  const title = readFlagValue(args, "title");
  if (!title) throw new Error(USAGE);
  const type = requireAllowedValue(readFlagValue(args, "type") ?? "chore", TICKET_TYPES, "type");
  const priority = requireAllowedValue(readFlagValue(args, "priority") ?? "P2", TICKET_PRIORITIES, "priority");
  const id = nextTicketId(listTicketFileNames());
  const fileName = `${id}-${slugify(title)}.md`;
  mkdirSync(TICKETS_DIR, { recursive: true });
  writeFileSync(
    join(TICKETS_DIR, fileName),
    renderTicket({ id, title, type, status: "backlog", priority, created: todayAsIsoDate() }),
  );
  console.log(join("docs", "tickets", fileName));
}

function printTickets(args: string[]): void {
  const statusFilter = readFlagValue(args, "status");
  const tickets = readAllTickets().filter((ticket) => !statusFilter || ticket.status === statusFilter);
  for (const ticket of tickets) {
    console.log(`${ticket.id}  ${ticket.status.padEnd(11)}  ${ticket.priority}  ${ticket.type.padEnd(7)}  ${ticket.title}`);
  }
  if (!tickets.length) console.log("No tickets.");
}

function runTicketCommand(args: string[]): void {
  const [command] = args;
  if (command === "new") return createTicket(args);
  if (command === "list") return printTickets(args);
  throw new Error(USAGE);
}

const isRunDirectly = process.argv[1]?.replace(/\\/g, "/").endsWith("scripts/ticket.ts");

if (isRunDirectly) {
  try {
    runTicketCommand(process.argv.slice(2));
  } catch (error) {
    console.error((error as Error).message);
    process.exit(1);
  }
}
