import { requireRole } from '@/lib/api/core/server';
import React from 'react';

export const instant = false;

const StudentLayout = async ({ children }: { children: React.ReactNode }) => {
    await requireRole('student')
    return children
};

export default StudentLayout;
