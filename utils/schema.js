import { serial, text, pgTable, varchar } from "drizzle-orm/pg-core";
export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(), //this 'id' is the 'column name' in Database
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jonPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()

    
})