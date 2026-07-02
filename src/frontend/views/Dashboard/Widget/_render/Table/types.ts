import { z } from "zod";

export const TableWidgetSchema = z.array(z.record(z.string(), z.unknown()));

export type ITableWidgetData = z.infer<typeof TableWidgetSchema>;
