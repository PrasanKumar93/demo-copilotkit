import { StudentRegistrationForm } from '@/components/business/StudentRegistrationForm';

import styles from './page.module.scss';



export const metadata = {
    title: 'Register New Student',
    description: 'Register a new student in the system',
};

/**
 * New Student Registration Page
 * 
 * Route: /students/new
 * Allows users to register a new student using the StudentRegistrationForm.
 */
const NewStudentPage = () => {
    return (
        <div className={styles.page}>

            <StudentRegistrationForm />
        </div>
    );
};

export default NewStudentPage;

