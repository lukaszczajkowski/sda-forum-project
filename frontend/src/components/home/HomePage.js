import React, { useEffect, useState } from "react";
import Api from "../../api/Api"

function HomePage() {

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        Api.get("/users/me")
            .then(r => setCurrentUser(r.data));
    }, []); 

    return (
        <div className="card">
            <div className="card-body">
                <p>Hello</p> 
                <p> {currentUser.name}</p>
                <h4 className="card-title">SDA starter template</h4>
                <p>This starter template is based on Spring, PostgreSQL, React, React router and Axios. Check the following links for documentation and guides:</p>
                <ul>
                    <li><a href="https://spring.io/projects/spring-boot">Spring</a></li>
                    <li><a href="https://www.postgresql.org">PostgreSQL</a></li>
                    <li><a href="https://reactjs.org">React</a></li>
                    <li><a href="https://reacttraining.com/react-router/web/guides/quick-start">React Router</a></li>
                    <li><a href="https://github.com/axios/axios">Axios</a></li>
                </ul>
            </div>
        </div>
    );
}

export default HomePage;