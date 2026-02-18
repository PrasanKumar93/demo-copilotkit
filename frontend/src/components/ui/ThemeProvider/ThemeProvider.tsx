'use client';

import { createTheme, ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ReactNode, useMemo } from 'react';

/**
 * Minimal MUI Theme configuration.
 *
 * STYLING ARCHITECTURE:
 * - Colors: Defined in _colors.scss, exposed as CSS vars (--color-*), overridden in component .module.scss files
 * - Typography: Defined in typography.scss & _fonts.scss, exposed as CSS vars (--font-*), overridden in component .module.scss files
 *
 * Each MUI wrapper component uses :global() selectors to override MUI's default styles with our CSS variables.
 * Example: :global(.MuiButton-root) { font-family: var(--font-family-primary); }
 *
 * NOTE: fontFamily here must match $font-family-primary in typography.scss for consistency
 */
const createAppTheme = () =>
    createTheme({
        typography: {
            // Must stay in sync with $font-family-primary in typography.scss
            fontFamily: '"Space Grotesk", -apple-system, BlinkMacSystemFont, sans-serif',
        },
        shape: {
            borderRadius: 8,
        },
        components: {
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                    size: 'medium',
                },
            },
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        textTransform: 'none',
                        fontWeight: 500,
                    },
                },
            },
            MuiSelect: {
                defaultProps: {
                    variant: 'outlined',
                    size: 'medium',
                },
            },
        },
    });

interface ThemeProviderProps {
    children: ReactNode;
}

/**
 * Application Theme Provider
 * Provides minimal MUI configuration. Colors are managed via CSS variables.
 */
const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const theme = useMemo(() => createAppTheme(), []);

    return (
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
};

export default ThemeProvider;
