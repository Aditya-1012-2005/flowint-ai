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
      'Stock levels that update on their own as you buy and sell',
      'Low-stock alerts before you run out of a fast-moving item',
      'One clear view instead of five different Excel files',
    ],
  },
  {
    icon: ReceiptText,
    title: 'Billing & invoicing',
    summary: 'Make clean, correct invoices in seconds and keep track of who still owes you.',
    details: [
      'GST-ready invoices without the manual formatting',
      'Payment tracking so nothing slips through the cracks',
      'Automatic reminders for pending payments',
    ],
  },
  {
    icon: FileSpreadsheet,
    title: 'Data entry automation',
    summary:
      'Stop retyping the same numbers. Details from bills and orders flow in on their own.',
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
      'See how the business is really doing, day by day and month by month, without building charts.',
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
    title: 'We learn how you work today',
    description:
      'We sit with you and look at your real setup: the Excel sheets, the registers, the WhatsApp orders, exactly as they are.',
  },
  {
    step: '2',
    title: 'We build automation around it',
    description:
      "We set up simple tools that fit the way you already work, so there's nothing new to learn.",
  },
  {
    step: '3',
    title: 'You get your time back',
    description:
      'The routine stuff runs on its own. You spend less time on data entry and more time on the business.',
  },
];
