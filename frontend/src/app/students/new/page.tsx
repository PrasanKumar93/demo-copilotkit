import { StudentRegistrationForm } from '@/components/business/StudentRegistrationForm';
import { CopilotSidebar } from "@copilotkit/react-ui";
import { COPILOTKIT_CONSTANTS } from '@/lib/ui-constants';
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
            <CopilotSidebar
                defaultOpen={true}
                instructions={
                    COPILOTKIT_CONSTANTS.INSTRUCTIONS
                }
                labels={{
                    title: COPILOTKIT_CONSTANTS.LABELS.TITLE,
                    initial: COPILOTKIT_CONSTANTS.LABELS.INITIAL,
                }}
            >
                <StudentRegistrationForm />
            </CopilotSidebar>
        </div>
    );
};

export default NewStudentPage;

