'use client';

import { useState } from 'react';
import DatePicker from './DatePicker';
import styles from '@/app/examples/examples.module.scss';

/**
 * DatePicker Example
 * Demonstrates various states and configurations of the DatePicker component.
 */
const DatePickerExample = () => {
  const [values, setValues] = useState<Record<string, string | null>>({
    basic: null,
    withValue: '2024-06-15',
    withMinMax: null,
    customFormat: null,
    withHelper: null,
    withError: null,
    disabled: '2024-01-01',
    required: null,
    small: null,
  });

  const handleChange = (name: string, value: string | null) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate min/max dates
  const today = new Date();
  const minDate = new Date(today.getFullYear() - 100, 0, 1); // 100 years ago
  const maxDate = new Date(); // Today

  return (
    <div className={styles.examplePage}>
      <header className={styles.header}>
        <h1>DatePicker Component</h1>
        <p>
          A wrapper around MUI X DatePicker with consistent interface. Uses dayjs for date handling
          and supports various date constraints and formats.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <div className={styles.demo}>
          <DatePicker
            name="basic"
            label="Select Date"
            value={values.basic}
            onChange={handleChange}
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="basic"
  label="Select Date"
  value={value}
  onChange={handleChange}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Initial Value</h2>
        <div className={styles.demo}>
          <DatePicker
            name="withValue"
            label="Event Date"
            value={values.withValue}
            onChange={handleChange}
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="withValue"
  label="Event Date"
  value="2024-06-15" // ISO string
  onChange={handleChange}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Min/Max Constraints</h2>
        <div className={styles.demo}>
          <DatePicker
            name="withMinMax"
            label="Date of Birth"
            value={values.withMinMax}
            onChange={handleChange}
            minDate={minDate}
            maxDate={maxDate}
            helperText="Must be between 100 years ago and today"
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="withMinMax"
  label="Date of Birth"
  value={value}
  onChange={handleChange}
  minDate={minDate}
  maxDate={maxDate}
  helperText="Must be between 100 years ago and today"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Custom Date Format</h2>
        <div className={styles.demo}>
          <DatePicker
            name="customFormat"
            label="Date (YYYY-MM-DD)"
            value={values.customFormat}
            onChange={handleChange}
            format="YYYY-MM-DD"
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="customFormat"
  label="Date (YYYY-MM-DD)"
  value={value}
  onChange={handleChange}
  format="YYYY-MM-DD"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Helper Text</h2>
        <div className={styles.demo}>
          <DatePicker
            name="withHelper"
            label="Start Date"
            value={values.withHelper}
            onChange={handleChange}
            helperText="When should this begin?"
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="withHelper"
  label="Start Date"
  value={value}
  onChange={handleChange}
  helperText="When should this begin?"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Error</h2>
        <div className={styles.demo}>
          <DatePicker
            name="withError"
            label="Due Date"
            value={values.withError}
            onChange={handleChange}
            error="Please select a valid date"
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="withError"
  label="Due Date"
  value={value}
  onChange={handleChange}
  error="Please select a valid date"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Disabled State</h2>
        <div className={styles.demo}>
          <DatePicker
            name="disabled"
            label="Registration Date"
            value={values.disabled}
            onChange={handleChange}
            disabled
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="disabled"
  label="Registration Date"
  value={value}
  onChange={handleChange}
  disabled
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Required Field</h2>
        <div className={styles.demo}>
          <DatePicker
            name="required"
            label="Appointment Date"
            value={values.required}
            onChange={handleChange}
            required
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="required"
  label="Appointment Date"
  value={value}
  onChange={handleChange}
  required
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Small Size</h2>
        <div className={styles.demo}>
          <DatePicker
            name="small"
            label="Date"
            value={values.small}
            onChange={handleChange}
            size="small"
          />
        </div>
        <pre className={styles.code}>
          {`<DatePicker
  name="small"
  label="Date"
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
              <td><code>string | Date | null</code></td>
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
              <td><code>format</code></td>
              <td><code>string</code></td>
              <td><code>&apos;DD/MM/YYYY&apos;</code></td>
              <td>Date display format</td>
            </tr>
            <tr>
              <td><code>minDate</code></td>
              <td><code>Date | string</code></td>
              <td>-</td>
              <td>Minimum selectable date</td>
            </tr>
            <tr>
              <td><code>maxDate</code></td>
              <td><code>Date | string</code></td>
              <td>-</td>
              <td>Maximum selectable date</td>
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

export default DatePickerExample;

