import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { IPieChartOptions } from "./pie-chart-options";
import { PieChartData } from "./pie-chart-data";
import { BehaviorSubject, Observable } from "rxjs";

export interface IActivePieChartArcInfo {
  data: PieChartData;
  isActive: boolean;
}

@Injectable()
export class PieChartService {
  private _arcActivated$ = new BehaviorSubject<IActivePieChartArcInfo>(null);

  private _arcLabel = (width: number, height: number) => {
    const radius = Math.min(width, height) / 2 * .7;
    return d3.arc().innerRadius(radius).outerRadius(radius);
  }

  private _pie = d3.pie().sort(null).value(d => d.valueOf())
  private _arcs = (data: PieChartData[]) => this._pie(data);

  arcActivated$: Observable<IActivePieChartArcInfo>;

  constructor() {
    this.arcActivated$ = this._arcActivated$.asObservable();
  }

  create(host: HTMLElement, options: IPieChartOptions, data: PieChartData[]): void {
    const height = options?.height || 120;
    const width = options?.width || 120;


    const arc = d3.arc()
    .innerRadius(Math.max(0, options?.innerRadius || 0))
    .outerRadius(Math.min((options?.width || 120), (options?.height || 120)) / 2 - 1);

    const svg = d3.select(host);

    if (width) {
      svg.attr('width', width);
    }
    if (height) {
      svg.attr('height', height)
    }


    svg.attr('viewBox', `0,0,${width},${height}`);

    const arcs = svg.append('g')
    .attr('stroke', 'white')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .selectAll('path')
    .data(this._arcs(data))
    .join('path')
    .attr('d', arc as any)

    this.applyArcColors(options, data, arcs);
    this.applyArcClasses(options, arcs);

    arcs.on('mouseenter', (event) => this.setActiveArc(event, true));
    arcs.on('mouseleave', (event) => this.setActiveArc(event, false));

    svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)
    .attr('font-size', 12)
    .attr('text-anchor', 'middle')
    .selectAll('text')
    .data(this._arcs(data))
    .join('text')
    .attr("transform", (d: any) => `translate(${this._arcLabel(width, height).centroid(d)})`)
    .call(text => text.append("tspan")
      .attr("y", "-0.4em")
      .attr("font-weight", "bold")
      .classed('no-mouse-events', true)
      .text((d: any) => d.data.name))
    .call(text => text.append("tspan")
      .attr('font-size', 10)
      .attr("x", 0)
      .attr("y", "0.7em")
      .attr("fill-opacity", 0.7)
      .classed('no-mouse-events', true)
      .text((d: any) => d.data.value.toLocaleString()))
  }

  private applyArcColors(options: IPieChartOptions, data: PieChartData[], arcs: any): void {
    const slices = data.map(d => d.name);
    const scaleFactory = () => d3.scaleOrdinal().domain(slices);
    const fallbackColors = scaleFactory().range(d3.schemeSet3);

    const colors = Array.isArray(options?.colors) ? scaleFactory().range(options.colors) : fallbackColors;
    arcs.attr('fill', (_: any, ix: number) => colors(ix as any));
  }

  private applyArcClasses(options: IPieChartOptions, arcs: any): void {
    const classes = options?.classes;
    if (Array.isArray(classes)) {
      arcs.attr('class', (_: any, ix: number) => classes.length > ix ? classes[ix] : 'generic-arc');
    }
  }

  private setActiveArc(event: any, isActive: boolean): void {
    const data = d3.select(event.target).datum() as PieChartData;
    this._arcActivated$.next({ data, isActive });
    PieChartService.lighten(event, isActive);
  }

  private static lighten(event: any, lighten: boolean): void {
    if (event && event.target) {
      const selection = d3.select(event.target);
      selection.classed('lighten', lighten);
    }
  }
}
