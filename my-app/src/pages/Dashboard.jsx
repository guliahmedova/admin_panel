import '../styles/dashboard.css';
import { SingleCard, RecommendCarCard } from '../components/index';
import { MileChart, CarStatsChart } from '../charts/index';
import recommendCarsData from '../assets/dummy-data/recommendCars';

const cardObj = [
  {
    title: "Total Cars",
    totalNumber: 750,
    icon: "ri-police-car-line"
  },
  {
    title: "Daily Trips",
    totalNumber: 1097,
    icon: "ri-steering-2-line"
  },
  {
    title: "Clients Annually",
    totalNumber: "80K",
    icon: "ri-user-line"
  },
  {
    title: "Kilometers Daily",
    totalNumber: 2190,
    icon: "ri-timer-flash-line"
  }
]

const Dashboard = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="dashboard__wrapper">
          <div className="dashboard__cards">
            <SingleCard item={cardObj[0]} />
            <SingleCard item={cardObj[1]} />
            <SingleCard item={cardObj[2]} />
            <SingleCard item={cardObj[3]} />
          </div>

          <div className="statics" style={{ width: "100%", display: 'flex', gap: "2rem" }}>
            <div className="stats" style={{ width: "95%" }}>
              <h3 className='stats__title'>Miles Statics</h3>
              <MileChart />
            </div>

            <div className="stats" style={{ width: "95%" }}>
              <h3 className='stats__title'>Car Statics</h3>
              <CarStatsChart />
            </div>
          </div>

          <div className="recommend__cars-wrapper">
            {
              recommendCarsData.map((car, index) => <RecommendCarCard item={car} key={index} />)
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard