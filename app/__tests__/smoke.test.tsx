import {render, screen} from "@testing-library/react"

test("smoke: render básico", ()=>{
  render(<div>Test</div>)
  expect(screen.getByText("Test")).toBeInTheDocument()
})