'use client';

import { useState } from 'react';
import TelInput from './TelInput';
import styles from '@/app/examples/examples.module.scss';

/**
 * TelInput Example
 * Demonstrates various states and configurations of the TelInput component.
 */
const TelInputExample = () => {
  const [values, setValues] = useState({
    basic: '',
    withCountryCode: '',
    withPlaceholder: '',
    withHelper: '',
    withError: '',
    disabled: '1234567890',
    required: '',
    small: '',
  });

  const handleChange = (name: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.examplePage}>
      <header className={styles.header}>
        <h1>TelInput Component</h1>
        <p>
          A wrapper around MUI TextField specifically for telephone/phone input. Supports optional
          country code prefix for international numbers.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <div className={styles.demo}>
          <TelInput
            name="basic"
            label="Phone Number"
            value={values.basic}
            onChange={handleChange}
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="basic"
  label="Phone Number"
  value={value}
  onChange={handleChange}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Country Code</h2>
        <div className={styles.demo}>
          <TelInput
            name="withCountryCode"
            label="US Phone"
            value={values.withCountryCode}
            onChange={handleChange}
            countryCode="+1"
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="withCountryCode"
  label="US Phone"
  value={value}
  onChange={handleChange}
  countryCode="+1"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Placeholder</h2>
        <div className={styles.demo}>
          <TelInput
            name="withPlaceholder"
            label="Mobile Number"
            value={values.withPlaceholder}
            onChange={handleChange}
            placeholder="(555) 123-4567"
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="withPlaceholder"
  label="Mobile Number"
  value={value}
  onChange={handleChange}
  placeholder="(555) 123-4567"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Helper Text</h2>
        <div className={styles.demo}>
          <TelInput
            name="withHelper"
            label="Emergency Contact"
            value={values.withHelper}
            onChange={handleChange}
            helperText="Include area code"
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="withHelper"
  label="Emergency Contact"
  value={value}
  onChange={handleChange}
  helperText="Include area code"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Error</h2>
        <div className={styles.demo}>
          <TelInput
            name="withError"
            label="Phone"
            value={values.withError}
            onChange={handleChange}
            error="Please enter a valid phone number"
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="withError"
  label="Phone"
  value={value}
  onChange={handleChange}
  error="Please enter a valid phone number"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Disabled State</h2>
        <div className={styles.demo}>
          <TelInput
            name="disabled"
            label="Registered Phone"
            value={values.disabled}
            onChange={handleChange}
            disabled
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="disabled"
  label="Registered Phone"
  value={value}
  onChange={handleChange}
  disabled
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Required Field</h2>
        <div className={styles.demo}>
          <TelInput
            name="required"
            label="Contact Phone"
            value={values.required}
            onChange={handleChange}
            required
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="required"
  label="Contact Phone"
  value={value}
  onChange={handleChange}
  required
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Small Size</h2>
        <div className={styles.demo}>
          <TelInput
            name="small"
            label="Alternate Phone"
            value={values.small}
            onChange={handleChange}
            size="small"
          />
        </div>
        <pre className={styles.code}>
          {`<TelInput
  name="small"
  label="Alternate Phone"
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
              <td><code>countryCode</code></td>
              <td><code>string</code></td>
              <td>-</td>
              <td>Country code prefix (e.g., &quot;+1&quot;)</td>
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
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default TelInputExample;

