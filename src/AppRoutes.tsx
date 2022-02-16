import { Route, Routes } from "react-router-dom"
import { CreationGeometry } from "./pages/CreationGeometry/CreationGeometry"


export const AppRoutes = () => {
  return (
   <Routes>
      <Route path="/" element={<CreationGeometry />} />
    </Routes>
)
  
}