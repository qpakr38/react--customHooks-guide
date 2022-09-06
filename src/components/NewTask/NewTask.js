import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
    const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();

    const enterTaskHandler = (taskText) => {

        const createTask = (taskText, textData) => {
            const generatedId = textData.name; // firebase-specific => "name" contains generated id
            const createdTask = {id: generatedId, text: taskText};
            props.onAddTask(createdTask);
        };

        sendTaskRequest({
            url: 'https://react-http-f752e-default-rtdb.firebaseio.com/tasks.json ',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: taskText})
        }, createTask.bind(null,taskText));
    };
    return (
        <Section>
            <TaskForm onEnterTask={enterTaskHandler} loading={isLoading}/>
            {error && <p>{error}</p>}
        </Section>
    );
};

export default NewTask;
