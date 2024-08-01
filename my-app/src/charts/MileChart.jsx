import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from 'recharts';
import mileStatics from '../assets/dummy-data/mileStatics';

const MileChart = () => {
  return (
    <ResponsiveContainer width="100%" style={{width: "!00%"}}>
      <BarChart data={mileStatics} width='100%' style={{ width: "100%" }}>
        <XAxis dataKey="name" stroke='#2884ff' />
        <Bar dataKey="mileStats" stroke='#2884ff' fill='#2884ff' barSize={30} />
        <Tooltip wrapperClassName='tooltip__style' cursor={false} />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default MileChart