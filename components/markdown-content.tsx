export type TocItem = {
  id: string;
  title: string;
  level: number;
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

function headingId(title: string, used: Map<string, number>) {
  const base = slugify(title) || "section";
  const count = used.get(base) ?? 0;
  used.set(base, count + 1);
  return count ? `${base}-${count + 1}` : base;
}

export function getMarkdownToc(markdown: string): TocItem[] {
  const used = new Map<string, number>();

  return markdown
    .split(/\r?\n/)
    .map((line) => {
      const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());

      if (!match) {
        return null;
      }

      const title = match[2].trim();

      return {
        id: headingId(title, used),
        title,
        level: match[1].length
      };
    })
    .filter((item): item is TocItem => Boolean(item));
}

function renderInline(text: string) {
  const parts: ReactNode[] = [];
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^)]+|\/[^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <a key={`${match[1]}-${match.index}`} href={match[2]} className="text-mint underline-offset-4 hover:underline">
        {match[1]}
      </a>
    );
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
}

export function MarkdownContent({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const usedHeadings = new Map<string, number>();
  const blocks: React.ReactNode[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];

  function flushParagraph(key: string) {
    if (!paragraph.length) {
      return;
    }

    blocks.push(
      <p key={key} className="leading-8 text-white/72">
        {renderInline(paragraph.join(" "))}
      </p>
    );
    paragraph = [];
  }

  function flushList(key: string) {
    if (!list.length) {
      return;
    }

    blocks.push(
      <ul key={key} className="list-disc space-y-2 pl-5 leading-7 text-white/70">
        {list.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    list = [];
  }

  for (const [index, rawLine] of lines.entries()) {
    const line = rawLine.trim();
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    const listItem = /^[-*]\s+(.+)$/.exec(line);

    if (!line) {
      flushParagraph(`p-${index}`);
      flushList(`ul-${index}`);
      continue;
    }

    if (heading) {
      flushParagraph(`p-${index}`);
      flushList(`ul-${index}`);

      const level = heading[1].length;
      const title = heading[2].trim();
      const id = headingId(title, usedHeadings);

      if (level === 1) {
        blocks.push(
          <h2 key={id} id={id} className="scroll-mt-24 text-3xl font-semibold text-white">
            {title}
          </h2>
        );
      } else if (level === 2) {
        blocks.push(
          <h2 key={id} id={id} className="scroll-mt-24 text-2xl font-semibold text-white">
            {title}
          </h2>
        );
      } else {
        blocks.push(
          <h3 key={id} id={id} className="scroll-mt-24 text-xl font-semibold text-white">
            {title}
          </h3>
        );
      }
      continue;
    }

    if (listItem) {
      flushParagraph(`p-${index}`);
      list.push(listItem[1].trim());
      continue;
    }

    flushList(`ul-${index}`);
    paragraph.push(line);
  }

  flushParagraph("p-end");
  flushList("ul-end");

  return <div className="space-y-6">{blocks}</div>;
}
import type { ReactNode } from "react";
