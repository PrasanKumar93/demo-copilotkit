'use client';

import { useState } from 'react';
import NumberInput from './NumberInput';
import styles from '@/app/examples/examples.module.scss';

/**
 * NumberInput Example
 * Demonstrates various states and configurations of the NumberInput component.
 */
const NumberInputExample = () => {
  const [values, setValues] = useState<Record<string, number | string>>({
    basic: '',
    withMinMax: 50,
    withStep: 0,
    withDecimal: 0.5,
    withHelper: '',
    withError: '',
    disabled: 100,
    required: '',
    small: '',
  });

  const handleChange = (name: string, value: string | number) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.examplePage}>
      <header className={styles.header}>
        <h1>NumberInput Component</h1>
        <p>
          A wrapper around MUI TextField specifically for numeric input. Supports min/max
          constraints, step increments, and decimal values.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Basic Usage</h2>
        <div className={styles.demo}>
          <NumberInput
            name="basic"
            label="Quantity"
            value={values.basic}
            onChange={handleChange}
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="basic"
  label="Quantity"
  value={value}
  onChange={handleChange}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Min/Max Constraints</h2>
        <div className={styles.demo}>
          <NumberInput
            name="withMinMax"
            label="Age (0-120)"
            value={values.withMinMax}
            onChange={handleChange}
            min={0}
            max={120}
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="withMinMax"
  label="Age (0-120)"
  value={value}
  onChange={handleChange}
  min={0}
  max={120}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Step Increment</h2>
        <div className={styles.demo}>
          <NumberInput
            name="withStep"
            label="Quantity (step 5)"
            value={values.withStep}
            onChange={handleChange}
            step={5}
            min={0}
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="withStep"
  label="Quantity (step 5)"
  value={value}
  onChange={handleChange}
  step={5}
  min={0}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Decimal Values</h2>
        <div className={styles.demo}>
          <NumberInput
            name="withDecimal"
            label="Price"
            value={values.withDecimal}
            onChange={handleChange}
            step={0.01}
            min={0}
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="withDecimal"
  label="Price"
  value={value}
  onChange={handleChange}
  step={0.01}
  min={0}
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Helper Text</h2>
        <div className={styles.demo}>
          <NumberInput
            name="withHelper"
            label="Rating"
            value={values.withHelper}
            onChange={handleChange}
            min={1}
            max={5}
            helperText="Enter a rating from 1 to 5"
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="withHelper"
  label="Rating"
  value={value}
  onChange={handleChange}
  min={1}
  max={5}
  helperText="Enter a rating from 1 to 5"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>With Error</h2>
        <div className={styles.demo}>
          <NumberInput
            name="withError"
            label="Score"
            value={values.withError}
            onChange={handleChange}
            error="Score must be between 0 and 100"
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="withError"
  label="Score"
  value={value}
  onChange={handleChange}
  error="Score must be between 0 and 100"
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Disabled State</h2>
        <div className={styles.demo}>
          <NumberInput
            name="disabled"
            label="Fixed Value"
            value={values.disabled}
            onChange={handleChange}
            disabled
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="disabled"
  label="Fixed Value"
  value={value}
  onChange={handleChange}
  disabled
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Required Field</h2>
        <div className={styles.demo}>
          <NumberInput
            name="required"
            label="Required Number"
            value={values.required}
            onChange={handleChange}
            required
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
  name="required"
  label="Required Number"
  value={value}
  onChange={handleChange}
  required
/>`}
        </pre>
      </section>

      <section className={styles.section}>
        <h2>Small Size</h2>
        <div className={styles.demo}>
          <NumberInput
            name="small"
            label="Small Input"
            value={values.small}
            onChange={handleChange}
            size="small"
          />
        </div>
        <pre className={styles.code}>
          {`<NumberInput
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
              <td><code>number | string</code></td>
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
              <td><code>min</code></td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Minimum allowed value</td>
            </tr>
            <tr>
              <td><code>max</code></td>
              <td><code>number</code></td>
              <td>-</td>
              <td>Maximum allowed value</td>
            </tr>
            <tr>
              <td><code>step</code></td>
              <td><code>number</code></td>
              <td><code>1</code></td>
              <td>Step increment</td>
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

export default NumberInputExample;

