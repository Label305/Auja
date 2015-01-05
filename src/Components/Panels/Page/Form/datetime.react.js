/**
 * A datetime field, properties:
 *
 * - label
 * - name
 * - .. any other allowed by input
 *
 * @jsx React.DOM
 */
define(['react', 'build/Components/Panels/Page/Form/label.react', 'moment', 'build/Components/Panels/Page/Form/date.react', 'build/Components/Panels/Page/Form/time.react'], function (React, Label, moment, Date, Time) {
    return React.createClass({
        getInitialState: function () {
            return {
                value: this.props.item.getValue(),
                date: moment(this.props.item.getValue(), this.props.item.getFormat()).format('YYYY-MM-DD'),
                time: moment(this.props.item.getValue(), this.props.item.getFormat()).format('HH:mm'),
                error: ""
            };
        },
        dateDidChange: function (date) {
            this.state.date = date;
            this.state.value = moment(date + ' ' + this.state.time).format(this.props.item.getFormat());
            this.setState(this.state);
            this.validateDateTime();
        },
        timeDidChange: function (time) {
            this.state.time = time;
            this.state.value = moment(this.state.date + ' ' + time).format(this.props.item.getFormat());
            this.setState(this.state);
            this.validateDateTime();
        },
        validateDateTime: function(){
            min = moment(this.props.item.getMin(), this.props.item.getFormat()).format(this.props.item.getFormat());
            max = moment(this.props.item.getMax(), this.props.item.getFormat()).format(this.props.item.getFormat());
            value = moment(this.state.value, this.props.item.getFormat()).format(this.props.item.getFormat());
            if (value > max){
                this.setState({error: "This is later than allowed"});
            }
            if (value < min){
                this.setState({error: "This is earlier than allowed"});
            }
            if (value > min && value < max){
                this.setState({error: ""});
            }
        },
        render: function () {
            var dateItem = $.extend(true, {}, this.props.item);
            dateItem.setFormat('YYYY-MM-DD');
            dateItem.setValue(this.state.date);//Pass formatted date since the dateItem will reference it to YYYY-MM-DD

            var timeItem = $.extend(true, {}, this.props.item);
            timeItem.setFormat('HH:mm');
            timeItem.setValue(this.state.time);//Same as the dateItem but with HH:mm

            return (
                <div>
                    <Label item={this.props.item} name={this.props.item.getLabel()} />
                    <Date item={dateItem} onChange={this.dateDidChange} />
                    <Time item={timeItem} onChange={this.timeDidChange} />
                    {this.state.error}
                    <input type="hidden" value={this.state.value} />
                </div>
            );
        }
    });
});