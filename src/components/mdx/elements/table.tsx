"use client";

import React from "react";

export const Table = (props: React.TableHTMLAttributes<HTMLTableElement>) => (
  <div className="my-6 w-full overflow-x-auto">
    <table className="w-full" {...props} />
  </div>
);

export const TableHead = (
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) => <thead {...props} />;

export const TableBody = (
  props: React.HTMLAttributes<HTMLTableSectionElement>,
) => <tbody {...props} />;

export const TableRow = (props: React.HTMLAttributes<HTMLTableRowElement>) => (
  <tr className="m-0 border-t even:bg-muted p-0" {...props} />
);

export const TableHeader = (
  props: React.ThHTMLAttributes<HTMLTableCellElement>,
) => (
  <th
    className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
    {...props}
  />
);

export const TableCell = (
  props: React.TdHTMLAttributes<HTMLTableCellElement>,
) => (
  <td
    className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
    {...props}
  />
);
