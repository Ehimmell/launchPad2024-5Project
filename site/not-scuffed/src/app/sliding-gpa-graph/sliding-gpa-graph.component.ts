import { AfterViewInit, Component, ElementRef, Inject, Input, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Chart, LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';

@Component({
  selector: 'app-sliding-gpa-graph',
  standalone: true,
  imports: [],
  templateUrl: './sliding-gpa-graph.component.html',
  styleUrls: ['./sliding-gpa-graph.component.css']
})
export class SlidingGpaGraphComponent implements AfterViewInit {
  @Input() uniAvg: number = 3.0;
  @Input() classAvg: number = 2.5;

  @ViewChild('gpaChart') gpaChartRef!: ElementRef<HTMLCanvasElement>;
  public chart: any;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeChart();
    }
  }

  initializeChart() {
    Chart.register(LinearScale, CategoryScale, LineController, LineElement, PointElement, Filler, annotationPlugin);

    const context = this.gpaChartRef.nativeElement.getContext('2d');

    // @ts-ignore
    const gradient = context.createLinearGradient(0, 0, context.canvas.width, 0);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'green');

    // @ts-ignore
    this.chart = new Chart(context, {
      type: 'line',
      data: {
        labels: [0, 1, 2, 3, 4],
        datasets: [
          {
            label: 'GPA',
            data: [4, 4, 4, 4, 4], // Ensure the data fills the entire rectangle
            borderColor: 'rgba(0, 0, 0, 0)',
            pointRadius: 0,
            fill: true,
            backgroundColor: gradient
          }
        ]
      },
      options: {
        scales: {
          x: {
            min: 0,
            max: 4,
            ticks: {
              stepSize: 0.5,
            }
          },
          y: {
            beginAtZero: true,
            max: 4,
          }
        },
        plugins: {
          filler: {
            propagate: true
          },
          annotation: {
            annotations: {
              uniAvgLine: {
                type: 'line',
                xMin: this.uniAvg,
                xMax: this.uniAvg,
                borderColor: 'black',
                borderWidth: 2,
                label: {
                  content: 'University GPA',
                  enabled: true,
                  position: 'top'
                }
              },
              classAvgLine: {
                type: 'line',
                xMin: this.classAvg,
                xMax: this.classAvg,
                borderColor: 'white',
                borderWidth: 2,
                label: {
                  color: 'white',
                  content: 'Class GPA',
                  enabled: true,
                  position: 'top'
                }
              }
            }
          },
          legend: {
            display: true,
            labels: {
              generateLabels: (chart:any) => {
                // @ts-ignore
                const annotations = chart.options.plugins.annotation.annotations;
                return [
                  {
                    text: 'University GPA',
                    // @ts-ignore
                    fillStyle: annotations.uniAvgLine.borderColor,
                  },
                  {
                    text: 'Class GPA',
                    // @ts-ignore
                    fillStyle: annotations.classAvgLine.borderColor,
                  }
                ];
              }
            }
          }
        }
      }
    });
  }
}
