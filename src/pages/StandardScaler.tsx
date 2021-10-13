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
      text: 'Standard Scaler Scatter Chart'
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'x value'
      }
    },
    y: {
      title: {
        display: true,
        text: 'y value'
      }
    }
  }
};

const StandardScaler = () => {
  const getDatasets = (points: any) => {
    const datasets = points;
    return { datasets };
  };

  const initData = getDatasets([]);
  const [data, setData] = useState(initData);

  const drawByCalc = () => {
    const points: Array<Point> = [];
    for (let a=1; a<=30; a++) {
      points.push({ x: Math.random(), y: Math.random() });
    };
    // get mean
    const mean: Point = {
      x: points.reduce((prev, current) => { return prev + current.x }, 0) / points.length,
      y: points.reduce((prev, current) => { return prev + current.y }, 0) / points.length,
    };
    // get standard deviation
    const sd: Point = {
      x: Math.sqrt(points.reduce((prev, current) => { return prev + (current.x - mean.x) ** 2 }, 0) / points.length),
      y: Math.sqrt(points.reduce((prev, current) => { return prev + (current.y - mean.y) ** 2 }, 0) / points.length),
    };
    // get standard values
    const standards = points.map(p => {
      return {
        x: (p.x - mean.x) / sd.x,
        y: (p.y - mean.y) / sd.y,
      }
    });
    const multidatasets = [
      {
        label: 'random values',
        data: points,
        backgroundColor: 'rgba(255, 99, 132, 1)',
      },
      {
        label: 'mean',
        data: [mean],
        backgroundColor: 'black',
        pointRadius: 5,
      },
      {
        label: 'standard deviation',
        data: [sd],
        backgroundColor: 'green',
        pointRadius: 5,
      },
      {
        label: 'standard scaler',
        data: standards,
        backgroundColor: 'blue',
      }
    ];
    const datasets = getDatasets(multidatasets);
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

export default StandardScaler;
