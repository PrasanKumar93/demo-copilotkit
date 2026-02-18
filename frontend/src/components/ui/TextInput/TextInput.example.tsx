'use client';

import { useState } from 'react';
import TextInput from './TextInput';
import styles from '@/app/examples/examples.module.scss';

/**
 * TextInput Example
 * Demonstrates various states and configurations of the TextInput component.
 */
const TextInputExample = () => {
    const [values, setValues] = useState({
        basic: '',
        withPlaceholder: '',
        withHelper: '',
        withError: '',
        disabled: 'Disabled value',
        required: '',
        password: '',
        multiline: '',
        maxLength: '',
        small: '',
    });

    const handleChange = (name: string, value: string | number) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className={styles.examplePage}>
            <header className={styles.header}>
                <h1>TextInput Component</h1>
                <p>
                    A wrapper around MUI TextField with consistent interface. Supports text and password
                    types, multiline mode, and various states.
                </p>
            </header>

            <section className={styles.section}>
                <h2>Basic Usage</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="basic"
                        label="Full Name"
                        value={values.basic}
                        onChange={handleChange}
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="basic"
  label="Full Name"
  value={value}
  onChange={handleChange}
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>With Placeholder</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="withPlaceholder"
                        label="Username"
                        value={values.withPlaceholder}
                        onChange={handleChange}
                        placeholder="Enter your username"
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="withPlaceholder"
  label="Username"
  value={value}
  onChange={handleChange}
  placeholder="Enter your username"
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>With Helper Text</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="withHelper"
                        label="Bio"
                        value={values.withHelper}
                        onChange={handleChange}
                        helperText="Tell us about yourself"
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="withHelper"
  label="Bio"
  value={value}
  onChange={handleChange}
  helperText="Tell us about yourself"
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>With Error</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="withError"
                        label="Email"
                        value={values.withError}
                        onChange={handleChange}
                        error="Please enter a valid email address"
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="withError"
  label="Email"
  value={value}
  onChange={handleChange}
  error="Please enter a valid email address"
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Disabled State</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="disabled"
                        label="Account ID"
                        value={values.disabled}
                        onChange={handleChange}
                        disabled
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="disabled"
  label="Account ID"
  value={value}
  onChange={handleChange}
  disabled
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Required Field</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="required"
                        label="Required Field"
                        value={values.required}
                        onChange={handleChange}
                        required
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="required"
  label="Required Field"
  value={value}
  onChange={handleChange}
  required
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Password Type</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="password"
                        label="Password"
                        value={values.password}
                        onChange={handleChange}
                        type="password"
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="password"
  label="Password"
  value={value}
  onChange={handleChange}
  type="password"
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Multiline (Textarea)</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="multiline"
                        label="Description"
                        value={values.multiline}
                        onChange={handleChange}
                        multiline
                        rows={4}
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="multiline"
  label="Description"
  value={value}
  onChange={handleChange}
  multiline
  rows={4}
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>With Max Length</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="maxLength"
                        label="Short Text"
                        value={values.maxLength}
                        onChange={handleChange}
                        maxLength={20}
                        helperText={`${values.maxLength.length}/20 characters`}
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="maxLength"
  label="Short Text"
  value={value}
  onChange={handleChange}
  maxLength={20}
  helperText={\`\${value.length}/20 characters\`}
/>`}
                </pre>
            </section>

            <section className={styles.section}>
                <h2>Small Size</h2>
                <div className={styles.demo}>
                    <TextInput
                        name="small"
                        label="Small Input"
                        value={values.small}
                        onChange={handleChange}
                        size="small"
                    />
                </div>
                <pre className={styles.code}>
                    {`<TextInput
  name="small"
  label="Small Input"
  value={value}
  onChange={handleChange}
  size="small"
/>`}
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
                            <td><code>name</code></td>
                            <td><code>string</code></td>
                            <td>-</td>
                            <td>Field identifier (required)</td>
                        </tr>
                        <tr>
                            <td><code>label</code></td>
                            <td><code>string</code></td>
                            <td>-</td>
                            <td>Display label (required)</td>
                        </tr>
                        <tr>
                            <td><code>value</code></td>
                            <td><code>string | number</code></td>
                            <td>-</td>
                            <td>Current value (required)</td>
                        </tr>
                        <tr>
                            <td><code>onChange</code></td>
                            <td><code>(name, value) =&gt; void</code></td>
                            <td>-</td>
                            <td>Change handler (required)</td>
                        </tr>
                        <tr>
                            <td><code>error</code></td>
                            <td><code>string</code></td>
                            <td>-</td>
                            <td>Error message</td>
                        </tr>
                        <tr>
                            <td><code>helperText</code></td>
                            <td><code>string</code></td>
                            <td>-</td>
                            <td>Helper text below field</td>
                        </tr>
                        <tr>
                            <td><code>placeholder</code></td>
                            <td><code>string</code></td>
                            <td>-</td>
                            <td>Placeholder text</td>
                        </tr>
                        <tr>
                            <td><code>disabled</code></td>
                            <td><code>boolean</code></td>
                            <td><code>false</code></td>
                            <td>Disable the field</td>
                        </tr>
                        <tr>
                            <td><code>required</code></td>
                            <td><code>boolean</code></td>
                            <td><code>false</code></td>
                            <td>Mark as required</td>
                        </tr>
                        <tr>
                            <td><code>fullWidth</code></td>
                            <td><code>boolean</code></td>
                            <td><code>true</code></td>
                            <td>Take full container width</td>
                        </tr>
                        <tr>
                            <td><code>size</code></td>
                            <td><code>&apos;small&apos; | &apos;medium&apos;</code></td>
                            <td><code>&apos;medium&apos;</code></td>
                            <td>Field size</td>
                        </tr>
                        <tr>
                            <td><code>type</code></td>
                            <td><code>&apos;text&apos; | &apos;password&apos;</code></td>
                            <td><code>&apos;text&apos;</code></td>
                            <td>Input type</td>
                        </tr>
                        <tr>
                            <td><code>multiline</code></td>
                            <td><code>boolean</code></td>
                            <td><code>false</code></td>
                            <td>Enable textarea mode</td>
                        </tr>
                        <tr>
                            <td><code>rows</code></td>
                            <td><code>number</code></td>
                            <td><code>4</code></td>
                            <td>Rows for multiline</td>
                        </tr>
                        <tr>
                            <td><code>maxLength</code></td>
                            <td><code>number</code></td>
                            <td>-</td>
                            <td>Maximum characters</td>
                        </tr>
                        <tr>
                            <td><code>minLength</code></td>
                            <td><code>number</code></td>
                            <td>-</td>
                            <td>Minimum characters</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default TextInputExample;

