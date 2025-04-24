import { Login } from "@/components/Login"
import { values } from "@/lib/consts"

const Home = () => (
  <>
    {!values.inGame && <Login />}
    <main>
      <canvas />
    </main>
  </>
)

export default Home
