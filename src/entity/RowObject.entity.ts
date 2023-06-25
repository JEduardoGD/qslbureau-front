export interface RowObject{
    qslId: number;
    toCallsign: string;
    datetimecapture: string;
    slotNumber: number;
    dateTimeCapture: Date;
}

/*

    private Integer id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="IDSLOT")
    private Slot slot;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="IDCAPTURER")
    private Capturer capturer;
    
    @Column(name = "CALLSIGNTO")
    private String callsignTo;
    
    @Column(name = "DATETIMECAPTURE")
    private Date datetimecapture;

*/