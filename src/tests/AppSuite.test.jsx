import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import LoginPage from '../components/LoginPage'

const user = {
    name: "blah",
    age: 211
};

test.skip("blah is 211 yrs old", () => {
    expect(user.name).toBe("blah");
    expect(user.age).toBe(211)
})

// added --dom to test: vitest in package.json

test("rendered loginpage", () => {
    render(<LoginPage />);
    // console.log(screen.getAllByText, "hi")
    expect(screen.getByText("login"));
})