import * as React from "react";
import { observer, inject } from "mobx-react";
import { Grid, Row, Col, PageHeader, Table, DropdownButton, MenuItem } from "react-bootstrap";
import ShiftStore from "../stores/ShiftStore";
import { ShiftMap, MonthDate, Shift } from "../stores/ShiftTypes";

@inject("shiftStore")
@observer
export default class MonthView extends React.Component<{shiftStore?: ShiftStore}, {}> {
  header(day: MonthDate) {
    return <th key={ day.date + day.dayOfWeek }> { day.date } </th>;
  }
  render() {
    if (!this.props.shiftStore)
      return <div> Not Yet Initialized </div>;
    let monthDays = this.props.shiftStore.getDaysByMonth(2016, 0);
    let weekDays = this.props.shiftStore.getDaysByWeek(2016, 3);
    return (
      <div>
        <Grid>
          <Row>
            <Col xs={12} md={8}> <PageHeader> Week Table </PageHeader></Col>
          </Row>
          <Row>
            <ShiftTable rowdays={ weekDays } rowPeriod="Week 03"/>
          </Row>
          <Row>
            <Col xs={12} md={8}> <PageHeader> Month Table </PageHeader> </Col>
          </Row>
        </Grid>
        <ShiftTable rowdays={ monthDays } rowPeriod={ `${monthDays[0].date} ~ ${monthDays[monthDays.length - 1].date}`}/>
      </div>
    );
  }
}

@inject("shiftStore")
@observer
class ShiftTable extends React.Component<{rowdays?: MonthDate[], rowPeriod: string, shiftStore?: ShiftStore}, {}> {
  header(day: MonthDate) {
    return <th key={day.date + day.dayOfWeek}> {day.date}</th>;
  }
  addShiftRow(name: string, dataMap: ShiftMap) {
    if (this.props.rowdays)
      return <ShiftRow name={name} rowdays={this.props.rowdays} dataMap={dataMap} key={name}/>;
  }
  render() {
    if (!this.props.shiftStore || !this.props.rowdays)
      return <div> Not Yet Initialized </div>;
    return <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>{this.props.rowPeriod}</th>
          {this.props.rowdays.map(p => this.header(p))}
        </tr>
      </thead>
      <tbody>
        { this.props.shiftStore.peopleMap.entries().map(p => this.addShiftRow(p[0], p[1]) )}
      </tbody>
    </Table>;
  }
}

@observer
class ShiftRow extends React.Component<{name: string, rowdays: MonthDate[], dataMap: ShiftMap}, {}> {
  dayToCell(date: MonthDate) {
    return <ShiftCell key={this.props.name + date.date} name={this.props.name} date={date}
      dataMap={this.props.dataMap} monthView={ this.props.rowdays.length > 20 }/>;
  }
  render() {
    return <tr>
      <td> {this.props.name} </td>
      { this.props.rowdays.map(p => this.dayToCell(p))}
    </tr>;
  }
}

@inject("shiftStore")
@observer
class ShiftCell extends React.Component<{name: string, date: MonthDate, dataMap: ShiftMap, monthView: boolean, shiftStore?: ShiftStore}, {}> {
  eventClick = (eventKey: any) => {
    if (this.props.shiftStore && eventKey in Shift)
      this.props.shiftStore.SetShift(this.props.name, eventKey, this.props.date);
    else
      console.log(`Received unexpected Shift type: ${eventKey}`);
  }
  doubleClick = () => {
    let shift = this.props.dataMap.get(this.props.date.isoFormat);
    if (this.props.shiftStore && shift)
      this.props.shiftStore.SetWholeWeekShift(this.props.name, shift, this.props.date);
  }
  buttonCell(name: string, shortName = "") {
    return <td className={ name } onDoubleClick={ this.doubleClick } key={this.props.date.isoFormat + name}>
      <DropdownButton title={ this.props.monthView ? shortName : name } id="bg-vertical-dropdown-1"
          className={ name } bsSize="xsmall" onSelect={ this.eventClick } >
        <MenuItem eventKey={ Shift.Morning } >Morning</MenuItem>
        <MenuItem eventKey={ Shift.Normal } >Normal</MenuItem>
        <MenuItem eventKey={ Shift.Late } >Late</MenuItem>
      </DropdownButton>
    </td>;
  }
  shiftToCell(shift: Shift) {
    switch (shift) {
      case Shift.Late:
        return this.buttonCell("Late", "L");
      case Shift.Morning:
        return this.buttonCell("Morning", "M");
      case Shift.Normal:
        return this.buttonCell("Normal", "N");
    }
  }
  render() {
    if (!this.props.shiftStore)
      return <div> Not Yet Initialized </div>;
    if (this.props.date.isoweekdate >= 6)
      return <td className="weekend"></td>;
    let shift = this.props.dataMap.get(this.props.date.isoFormat);
    if (shift)
      return this.shiftToCell(shift);
    return this.buttonCell("");
  }
}

