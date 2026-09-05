import { Boxes, ReceiptText, FileSpreadsheet, BarChart3, type LucideIcon } from 'lucide-react';

export type Solution = {
  icon: LucideIcon;
  title: string;
  summary: string;
  details: string[];
};

/** Shared by the Home preview and the full Solutions page. */
export const solutions: Solution[] = [
  {
    icon: Boxes,
    title: 'Inventory & stock tracking',
    summary: "Know what's in stock without counting registers or updating a spreadsheet by hand.",
    details: [
      'Stock levels that update automatically as you buy and sell',
      'Low-stock alerts before you run out of a fast-moving item',
      'One clear view instead of five different Excel files',
    ],
  },
  {
    icon: ReceiptText,
    title: 'Billing & invoicing',
    summary: 'Generate clean, correct invoices in seconds and keep track of who still owes you.',
    details: [
      'GST-ready invoices without manual formatting',
      'Payment tracking so nothing slips through the cracks',
      'Automatic reminders for pending payments',
    ],
  },
  {
    icon: FileSpreadsheet,
    title: 'Data entry automation',
    summary:
      'Stop retyping the same numbers. Let the details from bills and orders flow in on their own.',
    details: [
      'Pull details from bills, orders and messages automatically',
      'Fewer typos and mismatched entries',
      'Hours of manual typing saved every week',
    ],
  },
  {
    icon: BarChart3,
    title: 'Reports & insights',
    summary:
      'See how the business is really doing — daily, weekly, monthly — without building charts.',
    details: [
      'Ready-made sales and expense summaries',
      'Spot your best products and slow days at a glance',
      'No spreadsheet formulas to maintain',
    ],
  },
];

export const howItWorks = [
  {
    step: '1',
    title: 'We understand how you work today',
    description:
      'We sit with you and look at your current process — the Excel sheets, the registers, the WhatsApp orders — exactly as it is.',
  },
  {
    step: '2',
    title: 'We set up automation around it',
    description:
      "We build simple tools that fit your existing way of working, so there's nothing complicated to learn.",
  },
  {
    step: '3',
    title: 'You save time, every day',
    description:
      'Routine work runs on its own. You spend less time on data entry and more time running your business.',
  },
];
