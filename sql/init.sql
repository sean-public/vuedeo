-- Execute these statements to set up a new TimeScale DB for the project

DROP TABLE IF EXISTS call_metrics;

CREATE TABLE call_metrics(
    room_name VARCHAR(42) not null,
    participant VARCHAR(42) not null,
    time TIMESTAMP without TIME ZONE NOT NULL DEFAULT timezone('utc', NOW()),
    send_bps INTEGER DEFAULT 0,
    recv_bps INTEGER DEFAULT 0,
    send_packet_loss INTEGER DEFAULT 0,
    recv_packet_loss INTEGER DEFAULT 0
);

select create_hypertable('call_metrics', 'time');

CREATE INDEX call_metrics_idx 
    ON call_metrics (room_name, participant, time);
