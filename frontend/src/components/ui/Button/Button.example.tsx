'use client';

import { useState } from 'react';
import Button from './Button';
import styles from '@/app/examples/examples.module.scss';

/**
 * Button Example
 * Demonstrates various states and configurations of the Button component.
 */
const ButtonExample = () => {
    const [loading, setLoading] = useState(false);

    const handleLoadingClick = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    return (
        <div className={styles.examplePage}>
            <header className={styles.header}>
                <h1>Button Component</h1>
                <p>
                    A wrapper around MUI Button with consistent interface. Supports various variants, colors,
                    sizes, and a loading state with spinner.
                </p>
            </header>

            <section className={styles.section}>
                <h2>Variants</h2>
                <div className={styles.demo}>
                    <div className={styles.demoRow}>
                        <Button variant="contained">Contained</Button>
                        <Button variant="outlined">Outlined</Button>
                        <Button variant="text">Text</Button>
                    </div>
                </div>
                <pre className={styles.code}>
                    {`<Button variant="contained">Contained</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Colors</h2>
                <div className={styles.demo}>
                    <div className={styles.demoRow}>
                        <Button color="primary">Primary</Button>
                        <Button color="secondary">Secondary</Button>
                        <Button color="error">Error</Button>
                        <Button color="success">Success</Button>
                        <Button color="warning">Warning</Button>
                        <Button color="info">Info</Button>
                    </div>
                </div>
                <pre className={styles.code}>
                    {`<Button color="primary">Primary</Button>
<Button color="secondary">Secondary</Button>
<Button color="error">Error</Button>
<Button color="success">Success</Button>
<Button color="warning">Warning</Button>
<Button color="info">Info</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Outlined Colors</h2>
                <div className={styles.demo}>
                    <div className={styles.demoRow}>
                        <Button variant="outlined" color="primary">Primary</Button>
                        <Button variant="outlined" color="secondary">Secondary</Button>
                        <Button variant="outlined" color="error">Error</Button>
                        <Button variant="outlined" color="success">Success</Button>
                    </div>
                </div>
                <pre className={styles.code}>
                    {`<Button variant="outlined" color="primary">Primary</Button>
<Button variant="outlined" color="secondary">Secondary</Button>
<Button variant="outlined" color="error">Error</Button>
<Button variant="outlined" color="success">Success</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Sizes</h2>
                <div className={styles.demo}>
                    <div className={styles.demoRow}>
                        <Button size="small">Small</Button>
                        <Button size="medium">Medium</Button>
                        <Button size="large">Large</Button>
                    </div>
                </div>
                <pre className={styles.code}>
                    {`<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Disabled State</h2>
                <div className={styles.demo}>
                    <div className={styles.demoRow}>
                        <Button disabled>Disabled Contained</Button>
                        <Button variant="outlined" disabled>Disabled Outlined</Button>
                        <Button variant="text" disabled>Disabled Text</Button>
                    </div>
                </div>
                <pre className={styles.code}>
                    {`<Button disabled>Disabled Contained</Button>
<Button variant="outlined" disabled>Disabled Outlined</Button>
<Button variant="text" disabled>Disabled Text</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Loading State</h2>
                <div className={styles.demo}>
                    <div className={styles.demoRow}>
                        <Button loading={loading} onClick={handleLoadingClick}>
                            {loading ? 'Submitting...' : 'Click to Load'}
                        </Button>
                        <Button loading variant="outlined">Loading Outlined</Button>
                    </div>
                </div>
                <pre className={styles.code}>
                    {`<Button loading={isLoading} onClick={handleClick}>
  {isLoading ? 'Submitting...' : 'Submit'}
</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Full Width</h2>
                <div className={styles.demo}>
                    <Button fullWidth>Full Width Button</Button>
                </div>
                <pre className={styles.code}>
                    {`<Button fullWidth>Full Width Button</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Button Types</h2>
                <div className={styles.demo}>
                    <div className={styles.demoRow}>
                        <Button type="button">Button (default)</Button>
                        <Button type="submit">Submit</Button>
                        <Button type="reset" color="secondary">Reset</Button>
                    </div>
                </div>
                <pre className={styles.code}>
                    {`<Button type="button">Button</Button>
<Button type="submit">Submit</Button>
<Button type="reset">Reset</Button>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Props Reference</h2>
                <table className={styles.propsTable}>
                    <thead>
                        <tr>
                            <th>Prop</th>
                            <th>Type</th>
                            <th>Default</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>children</code></td>
                            <td><code>ReactNode</code></td>
                            <td>-</td>
                            <td>Button content (required)</td>
                        </tr>
                        <tr>
                            <td><code>onClick</code></td>
                            <td><code>() =&gt; void</code></td>
                            <td>-</td>
                            <td>Click handler</td>
                        </tr>
                        <tr>
                            <td><code>variant</code></td>
                            <td><code>&apos;contained&apos; | &apos;outlined&apos; | &apos;text&apos;</code></td>
                            <td><code>&apos;contained&apos;</code></td>
                            <td>Button style variant</td>
                        </tr>
                        <tr>
                            <td><code>color</code></td>
                            <td><code>&apos;primary&apos; | &apos;secondary&apos; | &apos;error&apos; | &apos;success&apos; | &apos;warning&apos; | &apos;info&apos;</code></td>
                            <td><code>&apos;primary&apos;</code></td>
                            <td>Button color</td>
                        </tr>
                        <tr>
                            <td><code>type</code></td>
                            <td><code>&apos;button&apos; | &apos;submit&apos; | &apos;reset&apos;</code></td>
                            <td><code>&apos;button&apos;</code></td>
                            <td>Button type attribute</td>
                        </tr>
                        <tr>
                            <td><code>disabled</code></td>
                            <td><code>boolean</code></td>
                            <td><code>false</code></td>
                            <td>Disable the button</td>
                        </tr>
                        <tr>
                            <td><code>loading</code></td>
                            <td><code>boolean</code></td>
                            <td><code>false</code></td>
                            <td>Show loading spinner</td>
                        </tr>
                        <tr>
                            <td><code>fullWidth</code></td>
                            <td><code>boolean</code></td>
                            <td><code>false</code></td>
                            <td>Take full container width</td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td><code>&apos;small&apos; | &apos;medium&apos; | &apos;large&apos;</code></td>
                            <td><code>&apos;medium&apos;</code></td>
                            <td>Button size</td>
                        </tr>
                        <tr>
                            <td><code>startIcon</code></td>
                            <td><code>ReactNode</code></td>
                            <td>-</td>
                            <td>Icon before text</td>
                        </tr>
                        <tr>
                            <td><code>endIcon</code></td>
                            <td><code>ReactNode</code></td>
                            <td>-</td>
                            <td>Icon after text</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default ButtonExample;

