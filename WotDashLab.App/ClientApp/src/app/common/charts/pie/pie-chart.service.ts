import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {IPieChartOptions} from "./pie-chart-options";
import {PieChartData} from "./pie-chart-data";

@Injectable()
export class PieChartService {
  private arcLabel = (width: number, height: number) => {
    const radius = Math.min(width, height) / 2 * .7;
    return d3.arc().innerRadius(radius).outerRadius(radius);
  }

  private pie = d3.pie().sort(null).value(d => d.valueOf())
  private arcs = (data: PieChartData[]) => this.pie(data);

  create(host: HTMLElement, options: IPieChartOptions, data: PieChartData[]): void {
    const height = options?.height || 120;
    const width = options?.width || 120;


    const arc = d3.arc()
      .innerRadius(Math.max(0, options?.innerRadius || 0))
      .outerRadius(Math.min((options?.width || 120), (options?.height || 120)) / 2 -1);

    const svg = d3.select(host);

    svg.attr('height', height).attr('width', width).attr('viewBox', `0,0,${width},${height}`);

    svg.append('g')
        .attr('stroke', 'white')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .selectAll('path')
      .data(this.arcs(data))
      .join('path')
        .attr('fill', (d: any, ix) => options.colors[ix])
        .attr('d', arc as any)

    svg.append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
    .selectAll('text')
      .data(this.arcs(data))
      .join('text')
        .attr("transform", (d: any) => `translate(${this.arcLabel(width, height).centroid(d)})`)
      .call(text => text.append("tspan")
        .attr("y", "-0.4em")
        .attr("font-weight", "bold")
        .text((d: any) => d.data.name))
      .call(text => text.append("tspan")
        .attr('font-size', 10)
        .attr("x", 0)
        .attr("y", "0.7em")
        .attr("fill-opacity", 0.7)
        .text((d: any) => d.data.value.toLocaleString()))
  }
}
