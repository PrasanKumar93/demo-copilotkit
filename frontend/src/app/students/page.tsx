'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllStudents } from '@/lib/api';
import type { Student } from '@/types';
import styles from './page.module.scss';

/**
 * Format date to a readable string
 */
const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Format full address
 */
const formatAddress = (address: Student['address']): string => {
    const parts = [
        address.street,
        address.city,
        address.state,
        address.zipCode,
        address.country,
    ].filter(Boolean);
    return parts.join(', ');
};

/**
 * Chevron Icon Component
 */
const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
    <svg
        className={`${styles.chevron} ${expanded ? styles.chevronExpanded : ''}`}
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <polyline points="6 9 12 15 18 9" />
    </svg>
);

/**
 * Field Component - Label on left, value on right
 */
const Field = ({ label, value }: { label: string; value: string | number }) => (
    <div className={styles.field}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
    </div>
);

/**
 * Student Card Component - Expandable horizontal card
 */
const StudentCard = ({ student }: { student: Student }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => setIsExpanded(!isExpanded);

    const hasExpandableContent = student.guardianName || student.guardianPhone || student.address;

    return (
        <article className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}>
            {/* Row 1: NAME, ID, EMAIL, PHONE */}
            <div className={styles.row}>
                <div className={styles.avatar}>
                    {student.firstName[0]}
                    {student.lastName[0]}
                </div>
                <div className={styles.fieldsGrid}>
                    <Field label="NAME" value={`${student.firstName} ${student.lastName}`} />
                    <Field label="ID" value={student.studentId} />
                    <Field label="EMAIL" value={student.email} />
                    <Field label="PHONE" value={student.phone || '—'} />
                </div>
                <button
                    className={styles.expandButton}
                    onClick={toggleExpand}
                    aria-expanded={isExpanded}
                    aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
                    disabled={!hasExpandableContent}
                >
                    <ChevronIcon expanded={isExpanded} />
                </button>
            </div>

            {/* Row 2: DEPT, COURSE, YEAR, ENROLLED */}
            <div className={styles.row}>
                <div className={styles.avatarSpacer} />
                <div className={styles.fieldsGrid}>
                    <Field label="DEPT" value={student.department} />
                    <Field label="COURSE" value={student.course} />
                    <Field label="YEAR" value={student.year} />
                    <Field label="ENROLLED" value={formatDate(student.enrollmentDate)} />
                </div>
                <div className={styles.expandButtonSpacer} />
            </div>

            {/* Expandable Section */}
            {hasExpandableContent && (
                <div className={`${styles.expandableSection} ${isExpanded ? styles.expanded : ''}`}>
                    <div className={styles.expandableContent}>
                        {/* Row 3: GUARDIAN, GUARDIAN PHONE, ADDRESS (4-col grid for alignment) */}
                        <div className={styles.row}>
                            <div className={styles.avatarSpacer} />
                            <div className={styles.fieldsGrid}>
                                <Field label="GUARDIAN" value={student.guardianName || '—'} />
                                <Field label="GUARDIAN PHONE" value={student.guardianPhone || '—'} />
                                <Field label="ADDRESS" value={formatAddress(student.address)} />
                                <div /> {/* Empty cell for 4-column alignment */}
                            </div>
                            <div className={styles.expandButtonSpacer} />
                        </div>
                    </div>
                </div>
            )}
        </article>
    );
};

/**
 * Loading Skeleton for Student Cards
 */
const LoadingSkeleton = () => {
    return (
        <div className={styles.cardList}>
            {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className={styles.skeletonCard}>
                    <div className={styles.skeletonRow}>
                        <div className={styles.skeletonAvatar} />
                        <div className={styles.skeletonField} />
                        <div className={styles.skeletonField} />
                        <div className={styles.skeletonField} />
                    </div>
                    <div className={styles.skeletonRow}>
                        <div className={styles.skeletonAvatarSpacer} />
                        <div className={styles.skeletonField} />
                        <div className={styles.skeletonField} />
                        <div className={styles.skeletonField} />
                        <div className={styles.skeletonField} />
                    </div>
                </div>
            ))}
        </div>
    );
};

/**
 * Empty State Component
 */
const EmptyState = () => {
    return (
        <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
            </div>
            <h3 className={styles.emptyTitle}>No Students Found</h3>
            <p className={styles.emptyDescription}>
                Get started by registering your first student.
            </p>
            <Link href="/students/new" className={styles.emptyAction}>
                Register Student
            </Link>
        </div>
    );
};

/**
 * Error State Component
 */
const ErrorState = ({ message, onRetry }: { message: string; onRetry: () => void }) => {
    return (
        <div className={styles.errorState}>
            <div className={styles.errorIcon}>
                <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>
            <h3 className={styles.errorTitle}>Something went wrong</h3>
            <p className={styles.errorDescription}>{message}</p>
            <button className={styles.retryButton} onClick={onRetry}>
                Try Again
            </button>
        </div>
    );
};

/**
 * Students Dashboard Page
 *
 * Route: /students
 * Displays all registered students in horizontal expandable cards.
 * Each card shows 2 rows of info by default, expandable to show more.
 */
const StudentsPage = () => {
    const [students, setStudents] = useState<Student[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchStudents = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getAllStudents();
            if (data?.length) {
                setStudents(data);
            }
            else {
                setStudents([]);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load students');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <p className={styles.subtitle}>
                    {isLoading
                        ? 'Loading students...'
                        : `${students.length} student${students.length !== 1 ? 's' : ''} registered`}
                </p>
            </header>

            <main className={styles.content}>
                {isLoading ? (
                    <LoadingSkeleton />
                ) : error ? (
                    <ErrorState message={error} onRetry={fetchStudents} />
                ) : students.length === 0 ? (
                    <EmptyState />
                ) : (
                    <div className={styles.cardList}>
                        {students.map((student) => (
                            <StudentCard key={student._id || student.studentId} student={student} />
                        ))}
                    </div>
                )}
            </main>

            {/* Floating Add Button */}
            <Link href="/students/new" className={styles.fab} title="Add Student">
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                >
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </Link>
        </div>
    );
};

export default StudentsPage;
