'use client';

import { useState } from 'react';
import EmailInput from './EmailInput';
import styles from '@/app/examples/examples.module.scss';

/**
 * EmailInput Example
 * Demonstrates various states and configurations of the EmailInput component.
 */
const EmailInputExample = () => {
  const [values, setValues] = useState({
    basic: '',
    withPlaceholder: '',
    withHelper: '',
    withError: '',
    disabled: 'disabled@example.com',
    required: '',
    small: '',
  });

  const handleChange = (name: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.examplePage}>
      <header className={styles.header}>
        <h1>EmailInput Component</h1>
        <p>
          A wrapper around MUI TextField specifically for email input. Provides native email
          validation and consistent interface with other form components.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <div className={styles.demo}>
          <EmailInput
            name="basic"
            label="Email Address"
            value={values.basic}
            onChange={handleChange}
          />
        </div>
        <pre className={styles.code}>
          {`<EmailInput
  name="basic"
  label="Email Address"
  value={value}
  onChange={handleChange}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Placeholder</h2>
        <div className={styles.demo}>
          <EmailInput
            name="withPlaceholder"
            label="Work Email"
            value={values.withPlaceholder}
            onChange={handleChange}
            placeholder="you@company.com"
          />
        </div>
        <pre className={styles.code}>
          {`<EmailInput
  name="withPlaceholder"
  label="Work Email"
  value={value}
  onChange={handleChange}
  placeholder="you@company.com"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Helper Text</h2>
        <div className={styles.demo}>
          <EmailInput
            name="withHelper"
            label="Contact Email"
            value={values.withHelper}
            onChange={handleChange}
            helperText="We'll never share your email with anyone"
          />
        </div>
        <pre className={styles.code}>
          {`<EmailInput
  name="withHelper"
  label="Contact Email"
  value={value}
  onChange={handleChange}
  helperText="We'll never share your email with anyone"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Error</h2>
        <div className={styles.demo}>
          <EmailInput
            name="withError"
            label="Email"
            value={values.withError}
            onChange={handleChange}
            error="Please enter a valid email address"
          />
        </div>
        <pre className={styles.code}>
          {`<EmailInput
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
          <EmailInput
            name="disabled"
            label="Primary Email"
            value={values.disabled}
            onChange={handleChange}
            disabled
          />
        </div>
        <pre className={styles.code}>
          {`<EmailInput
  name="disabled"
  label="Primary Email"
  value={value}
  onChange={handleChange}
  disabled
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Required Field</h2>
        <div className={styles.demo}>
          <EmailInput
            name="required"
            label="Email"
            value={values.required}
            onChange={handleChange}
            required
          />
        </div>
        <pre className={styles.code}>
          {`<EmailInput
  name="required"
  label="Email"
  value={value}
  onChange={handleChange}
  required
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Small Size</h2>
        <div className={styles.demo}>
          <EmailInput
            name="small"
            label="Newsletter Email"
            value={values.small}
            onChange={handleChange}
            size="small"
          />
        </div>
        <pre className={styles.code}>
          {`<EmailInput
  name="small"
  label="Newsletter Email"
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
              <td><code>maxLength</code></td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Maximum characters</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default EmailInputExample;

