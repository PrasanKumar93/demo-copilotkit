'use client';

import { useState } from 'react';
import Select from './Select';
import styles from '@/app/examples/examples.module.scss';

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'de', label: 'Germany' },
];

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'archived', label: 'Archived', disabled: true },
];

const skillOptions = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' },
  { value: 'nodejs', label: 'Node.js' },
  { value: 'python', label: 'Python' },
];

/**
 * Select Example
 * Demonstrates various states and configurations of the Select component.
 */
const SelectExample = () => {
  const [values, setValues] = useState<Record<string, string | string[]>>({
    basic: '',
    withPlaceholder: '',
    withHelper: '',
    withError: '',
    withDisabledOption: '',
    disabled: 'us',
    required: '',
    multiple: [],
    small: '',
  });

  const handleChange = (name: string, value: string | number | (string | number)[]) => {
    setValues((prev) => ({ ...prev, [name]: value as string | string[] }));
  };

  return (
    <div className={styles.examplePage}>
      <header className={styles.header}>
        <h1>Select Component</h1>
        <p>
          A wrapper around MUI Select with consistent interface. Supports single and multiple
          selection modes, disabled options, and various states.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <div className={styles.demo}>
          <Select
            name="basic"
            label="Country"
            value={values.basic}
            onChange={handleChange}
            options={countryOptions}
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="basic"
  label="Country"
  value={value}
  onChange={handleChange}
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    // ...
  ]}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Placeholder</h2>
        <div className={styles.demo}>
          <Select
            name="withPlaceholder"
            label="Status"
            value={values.withPlaceholder}
            onChange={handleChange}
            options={statusOptions}
            placeholder="Select a status..."
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="withPlaceholder"
  label="Status"
  value={value}
  onChange={handleChange}
  options={statusOptions}
  placeholder="Select a status..."
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Helper Text</h2>
        <div className={styles.demo}>
          <Select
            name="withHelper"
            label="Country"
            value={values.withHelper}
            onChange={handleChange}
            options={countryOptions}
            helperText="Select your country of residence"
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="withHelper"
  label="Country"
  value={value}
  onChange={handleChange}
  options={countryOptions}
  helperText="Select your country of residence"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Error</h2>
        <div className={styles.demo}>
          <Select
            name="withError"
            label="Country"
            value={values.withError}
            onChange={handleChange}
            options={countryOptions}
            error="Please select a country"
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="withError"
  label="Country"
  value={value}
  onChange={handleChange}
  options={countryOptions}
  error="Please select a country"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Disabled Option</h2>
        <div className={styles.demo}>
          <Select
            name="withDisabledOption"
            label="Status"
            value={values.withDisabledOption}
            onChange={handleChange}
            options={statusOptions}
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="withDisabledOption"
  label="Status"
  value={value}
  onChange={handleChange}
  options={[
    { value: 'active', label: 'Active' },
    { value: 'archived', label: 'Archived', disabled: true },
  ]}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Disabled State</h2>
        <div className={styles.demo}>
          <Select
            name="disabled"
            label="Country"
            value={values.disabled}
            onChange={handleChange}
            options={countryOptions}
            disabled
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="disabled"
  label="Country"
  value={value}
  onChange={handleChange}
  options={countryOptions}
  disabled
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Required Field</h2>
        <div className={styles.demo}>
          <Select
            name="required"
            label="Country"
            value={values.required}
            onChange={handleChange}
            options={countryOptions}
            required
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="required"
  label="Country"
  value={value}
  onChange={handleChange}
  options={countryOptions}
  required
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Multiple Selection</h2>
        <div className={styles.demo}>
          <Select
            name="multiple"
            label="Skills"
            value={values.multiple}
            onChange={handleChange}
            options={skillOptions}
            multiple
            helperText="Select all that apply"
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="multiple"
  label="Skills"
  value={values} // Array of selected values
  onChange={handleChange}
  options={skillOptions}
  multiple
  helperText="Select all that apply"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Small Size</h2>
        <div className={styles.demo}>
          <Select
            name="small"
            label="Country"
            value={values.small}
            onChange={handleChange}
            options={countryOptions}
            size="small"
          />
        </div>
        <pre className={styles.code}>
          {`<Select
  name="small"
  label="Country"
  value={value}
  onChange={handleChange}
  options={countryOptions}
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
              <td><code>string | string[]</code></td>
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
              <td><code>options</code></td>
              <td><code>SelectOption[]</code></td>
              <td>-</td>
              <td>Available options (required)</td>
            </tr>
            <tr>
              <td><code>multiple</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Allow multiple selection</td>
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

export default SelectExample;

