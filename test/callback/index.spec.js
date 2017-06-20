import Conference from '../../src/callback';

describe('Conference.attendeeCollection', () => {
    let attender = {};
    let collection = {};

    beforeEach(() => {
        attender = Conference.attendee('정식', '장');
        collection = Conference.attendeeCollection();
    });

    describe('contains(attendee)', () => {
        it('collection에 attender가 포함이 되어 있는지 확인한다.', () => {
            expect(collection.contains(attender.getFullName())).toBe(-1);
        });
    });

    describe('add(attendee)', () => {
        it('collection에 attender를 추가한다.', () => {
            collection.add(attender.getFullName());

            expect(collection.getCount()).toBe(1);
        });
    });

    describe('remove(attendee)', () => {
        it('collection에 attender를 삭제한다.', () => {
            collection.remove(attender.getFullName());

            expect(collection.getCount()).toBe(0);
        });
    });

    describe('iterate(callback)', () => {
        let callbackSpy;

        // helper method.
        const addAttendeesToCollection = (attendeeArray) => {
            attendeeArray.forEach((attendee) => {
                collection.add(attendee);
            });
        };

        const verifyCallbackWasExecutedForEachAttendee = (attendeeArray) => {
            expect(callbackSpy.calls.count()).toBe(attendeeArray.length);

            let allCalls = callbackSpy.calls.all();
            let i = 0;

            for(; i < allCalls.length; i += 1){
                expect(allCalls[i].args[0]).toBe(attendeeArray[i]);
            }
        };

        beforeEach(() => {
            callbackSpy = jasmine.createSpy();
        });

        it('빈 컬렉션에서는 콜백을 실행하지 않는다.', () => {
            collection.iterate(callbackSpy);
            expect(callbackSpy).not.toHaveBeenCalled();
        });

        it('원소가 하나뿐인 컬렉션은 콜백을 한 번만 실행한다.', () => {
            let attendees = [Conference.attendee('윤지', '김')];

            addAttendeesToCollection(attendees);
            collection.iterate(callbackSpy);

            verifyCallbackWasExecutedForEachAttendee(attendees);
        });

        it('컬렉션 원소마다 한 번씩 콜백을 실행한다.', () => {
            let attendees = [
                Conference.attendee('윤지', '김'),
                Conference.attendee('정식', '장'),
                Conference.attendee('길동', '홍'),
                Conference.attendee('무개', '아')
            ];

            addAttendeesToCollection(attendees);
            collection.iterate(callbackSpy);

            verifyCallbackWasExecutedForEachAttendee(attendees);
        });
    });
});

// 각 모듈별 파일로 작성하여 관리해야 하지만, 테스트 개념을 익히기 위함으로.
describe('Conference.checkInService', () => {
    let checkInService;
    let checkInRecorder;
    let attendee;

    beforeEach(() => {
        checkInRecorder = Conference.checkInRecorder();
        spyOn(checkInRecorder, 'recordCheckIn');
        checkInService = Conference.checkInService(checkInRecorder);

        attendee = Conference.attendee('정식', '장');
    });

    describe('checkInService.checkIn(attendee)', () => {
        it('참가자를 체크인 처리한 것으로 표시한다.', () => {
            checkInService.checkIn(attendee);
            expect(attendee.isCheckedIn()).toBe(true);
        });

        it('체크인을 등록한다.', () => {
            checkInService.checkIn(attendee);
            expect(checkInRecorder.recordCheckIn).toHaveBeenCalledWith(attendee);
        });
    });
});
