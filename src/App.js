import { useState } from "react";
import "./App.css";

function App() {
    const [formData, setFormData] = useState({
        email: "",
        password1: "",
        password2: "",
    });

    const [formErrors, setFormErrors] = useState({
        email: null,
        password1: null,
        password2: null,
    });

    const validateField = (fieldName, value) => {
        const errors = { ...formErrors };
        switch (fieldName) {
            case "email":
                errors.email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ? null
                    : "Неправильный email. Пожалуйста, попробуйте снова.";
                break;
            case "password1":
                errors.password1 =
                    value.length >= 8 &&
                    /[a-z]/.test(value) &&
                    /[A-Z]/.test(value) &&
                    /\d/.test(value)
                        ? null
                        : "Пароль должен быть длиннее 8 символов и содержать хотя бы 1 строчную, 1 заглавную букву и 1 цифру.";
                break;
            case "password2":
                errors.password2 =
                    formData.password1 === value ? null : "Пароли не совпадают.";
                break;
            default:
                break;
        }
        setFormErrors(errors);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        if (!Object.values(formErrors).some((error) => error !== null)) {
            console.log(formData);
        }
    };

    return (
        <div className="App">
            {Object.values(formErrors).some((error) => error !== null) && (
                <div className="errorText">
                    {Object.values(formErrors)
                        .filter((error) => error !== null)
                        .join("\n")}
                </div>
            )}
            <form onSubmit={onSubmit}>
                <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <input
                    required
                    name="password1"
                    type="password"
                    placeholder="Password"
                    value={formData.password1}
                    onChange={handleInputChange}
                />
                <input
                    required
                    name="password2"
                    type="password"
                    placeholder="Rewrite password"
                    value={formData.password2}
                    onChange={handleInputChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default App;
