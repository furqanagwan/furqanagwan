"use client";

import React from "react";

export const UnorderedList = (
  props: React.HTMLAttributes<HTMLUListElement>,
) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props} />;

export const OrderedList = (props: React.HTMLAttributes<HTMLOListElement>) => (
  <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props} />
);

export const ListItem = (props: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li {...props} />
);
