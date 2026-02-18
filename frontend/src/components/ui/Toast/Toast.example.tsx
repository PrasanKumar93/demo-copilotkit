'use client';

import { useState } from 'react';
import Toast, { ToastType, ToastPosition } from './Toast';
import Button from '../Button/Button';

/**
 * Toast Component Examples
 * 
 * Demonstrates various Toast configurations and use cases.
 */
const ToastExamples = () => {
    // Single toast state for position testing (shows one at a time)
    const [positionToast, setPositionToast] = useState<{
        id: number;
        message: string;
        type: ToastType;
        position: ToastPosition;
    } | null>(null);

    // Multiple toasts for type variants
    const [typeToasts, setTypeToasts] = useState<{
        id: number;
        message: string;
        type: ToastType;
        position: ToastPosition;
    }[]>([]);

    const showTypeToast = (type: ToastType, message: string) => {
        const id = Date.now();
        setTypeToasts(prev => [...prev, { id, message, type, position: 'top-right' }]);
    };

    const dismissTypeToast = (id: number) => {
        setTypeToasts(prev => prev.filter(toast => toast.id !== id));
    };

    const showPositionToast = (position: ToastPosition, message: string) => {
        // Replace any existing position toast
        setPositionToast({
            id: Date.now(),
            message,
            type: 'info',
            position,
        });
    };

    const dismissPositionToast = () => {
        setPositionToast(null);
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', padding: '2rem' }}>
            <h2>Toast Examples</h2>

            {/* Type variants */}
            <h3>Type Variants</h3>
            <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>
                Click to show multiple toasts (stacks at top-right)
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button
                    color="success"
                    onClick={() => showTypeToast('success', 'Operation completed successfully!')}
                >
                    Success Toast
                </Button>
                <Button
                    color="error"
                    onClick={() => showTypeToast('error', 'An error occurred. Please try again.')}
                >
                    Error Toast
                </Button>
                <Button
                    color="warning"
                    onClick={() => showTypeToast('warning', 'Please review before proceeding.')}
                >
                    Warning Toast
                </Button>
                <Button
                    color="info"
                    onClick={() => showTypeToast('info', 'Here is some helpful information.')}
                >
                    Info Toast
                </Button>
            </div>

            {/* Position variants */}
            <h3>Position Variants</h3>
            <p style={{ color: '#666', fontSize: '0.875rem', margin: 0 }}>
                Click to see toast at different screen positions (replaces previous)
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Button
                    variant="outlined"
                    onClick={() => showPositionToast('top-right', 'Top Right Toast')}
                >
                    Top Right
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => showPositionToast('top-left', 'Top Left Toast')}
                >
                    Top Left
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => showPositionToast('bottom-right', 'Bottom Right Toast')}
                >
                    Bottom Right
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => showPositionToast('bottom-left', 'Bottom Left Toast')}
                >
                    Bottom Left
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => showPositionToast('top-center', 'Top Center Toast')}
                >
                    Top Center
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => showPositionToast('bottom-center', 'Bottom Center Toast')}
                >
                    Bottom Center
                </Button>
            </div>

            {/* Render type toasts */}
            {typeToasts.map((toast, index) => (
                <Toast
                    key={toast.id}
                    message={toast.message}
                    type={toast.type}
                    position={toast.position}
                    onDismiss={() => dismissTypeToast(toast.id)}
                    style={{ top: `calc(var(--spacing-xl) + ${index * 70}px)` }}
                />
            ))}

            {/* Render position toast */}
            {positionToast && (
                <Toast
                    key={positionToast.id}
                    message={positionToast.message}
                    type={positionToast.type}
                    position={positionToast.position}
                    onDismiss={dismissPositionToast}
                />
            )}
        </div>
    );
};

export default ToastExamples;

