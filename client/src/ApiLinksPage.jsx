import React, { useState } from 'react';

const ApiLinksPage = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const endpoints = [
        { name: 'Students', url: 'http://localhost:4000/api/students' },
        { name: 'Lecturers', url: 'http://localhost:4000/api/lecturers' },
        { name: 'Administrators', url: 'http://localhost:4000/api/administrators' },
        { name: 'Departments', url: 'http://localhost:4000/api/departments' },
        { name: 'Action Histories', url: 'http://localhost:4000/api/action_histories' },
        { name: 'Subjects', url: 'http://localhost:4000/api/subjects' },
        { name: 'Classes', url: 'http://localhost:4000/api/classes' },
        { name: 'Tuition Fees', url: 'http://localhost:4000/api/tuition_fees' },
        { name: 'Enrollments', url: 'http://localhost:4000/api/enrollments' },
        { name: 'Chapters', url: 'http://localhost:4000/api/chapters' },
        { name: 'Practical Exercises', url: 'http://localhost:4000/api/practical_exercises' },
        { name: 'Exams', url: 'http://localhost:4000/api/exams' },
        { name: 'Materials', url: 'http://localhost:4000/api/materials' },
        { name: 'Questions', url: 'http://localhost:4000/api/questions' },
        { name: 'Test Performances', url: 'http://localhost:4000/api/test_performances' },
        { name: 'Multiple Choice Options', url: 'http://localhost:4000/api/multiple_choice_options' },
        { name: 'Participations', url: 'http://localhost:4000/api/participations' },
        { name: 'Certificates', url: 'http://localhost:4000/api/certificates' }
    ];

    const fetchData = async (url) => {
        setLoading(true);
        setError(null);
        setData(null); // Clear previous data
        try {
            const response = await fetch(url);
            const contentType = response.headers.get('content-type');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            if (contentType && contentType.includes('application/json')) {
                const result = await response.json();
                setData(result);
            } else {
                throw new Error('Response is not JSON');
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>API Endpoints</h1>
            <ul>
                {endpoints.map((endpoint) => (
                    <li key={endpoint.url}>
                        <button onClick={() => fetchData(endpoint.url)}>
                            {endpoint.name}
                        </button>

                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {data && (
                <div>
                    <h2>Data</h2>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiLinksPage;