'use client';

import { useState } from 'react';
import styles from './examples.module.scss';

// Import example components directly
import TextInputExample from '@/components/ui/TextInput/TextInput.example';
import EmailInputExample from '@/components/ui/EmailInput/EmailInput.example';
import TelInputExample from '@/components/ui/TelInput/TelInput.example';
import NumberInputExample from '@/components/ui/NumberInput/NumberInput.example';
import SelectExample from '@/components/ui/Select/Select.example';
import DatePickerExample from '@/components/ui/DatePicker/DatePicker.example';
import ButtonExample from '@/components/ui/Button/Button.example';
import ToastExample from '@/components/ui/Toast/Toast.example';

const components = [
    {
        id: 'text-input',
        name: 'TextInput',
        description: 'Text input field with label, validation, multiline support',
        Component: TextInputExample,
    },
    {
        id: 'email-input',
        name: 'EmailInput',
        description: 'Email-specific input with native validation',
        Component: EmailInputExample,
    },
    {
        id: 'tel-input',
        name: 'TelInput',
        description: 'Phone/telephone input with country code support',
        Component: TelInputExample,
    },
    {
        id: 'number-input',
        name: 'NumberInput',
        description: 'Numeric input with min/max, step, and decimal support',
        Component: NumberInputExample,
    },
    {
        id: 'select',
        name: 'Select',
        description: 'Dropdown select with single and multiple selection',
        Component: SelectExample,
    },
    {
        id: 'date-picker',
        name: 'DatePicker',
        description: 'Date picker with min/max constraints and custom formats',
        Component: DatePickerExample,
    },
    {
        id: 'button',
        name: 'Button',
        description: 'Button with variants, colors, sizes, and loading state',
        Component: ButtonExample,
    },
    {
        id: 'toast',
        name: 'Toast',
        description: 'Toast notifications with types, positions, and auto-dismiss',
        Component: ToastExample,
    },
];

/**
 * Examples Page
 * Single page with sidebar navigation to view all component examples.
 */
const ExamplesPage = () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const selectedComponent = components.find((c) => c.id === selectedId);

    return (
        <div className={styles.layout}>
            <aside className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1>UI Components</h1>
                    <p>Reusable form components</p>
                </div>
                <nav className={styles.nav}>
                    {components.map((component) => (
                        <button
                            key={component.id}
                            className={`${styles.navItem} ${selectedId === component.id ? styles.active : ''}`}
                            onClick={() => setSelectedId(component.id)}
                        >
                            <span className={styles.navName}>{component.name}</span>
                            <span className={styles.navDescription}>{component.description}</span>
                        </button>
                    ))}
                </nav>
            </aside>

            <main className={styles.content}>
                {selectedComponent ? (
                    <div className={styles.exampleWrapper}>
                        <selectedComponent.Component />
                    </div>
                ) : (
                    <div className={styles.placeholder}>
                        <div className={styles.placeholderContent}>
                            <h2>Select a Component</h2>
                            <p>Choose a component from the sidebar to view its examples and documentation.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ExamplesPage;
