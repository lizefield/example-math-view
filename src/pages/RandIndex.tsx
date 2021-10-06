import '../App.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Scatter } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';

interface Point {
  x: number;
  y: number;
}

const options: ChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Rand Index Scatter Chart'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'total count by contingency table'
      }
    },
    y: {
      title: {
        display: true,
        text: 'rand index value'
      }
    }
  }
};

const RandIndex = () => {
  const getDatasets = (points: Array<Point>) => {
    const datasets = [
      {
        label: 'A dataset',
        data: points,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
    ];
    return { datasets };
  };

  const initData = getDatasets([]);
  const [data, setData] = useState(initData);

  const calcRI = (a: number, b: number, c: number, d: number): number => {
    return (a + d) / (a + b + c + d);
  }

  const drawByCalc = () => {
    const points: Array<Point> = [];
    for (let a=1; a<=10; a++) {
      for (let b=1; b<=10; b++) {
        for (let c=1; c<=10; c++) {
          for (let d=1; d<=10; d++) {
            const point = calcRI(a, b, c, d);
            points.push({ x: (a + b + c + d), y: point });
          }
        }
      }
    }
    const datasets = getDatasets(points);
    setData(datasets);
  }

  useEffect(() => {
    drawByCalc();
  }, []);

  return (
    <>
      <Scatter data={data} options={options} />
      <br />
      <Link to='/'>Go to Top</Link>
    </>
  );
}

export default RandIndex;
