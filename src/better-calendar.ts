export default class DummyClass {
    constructor() {
        console.log(`@create time (ms) : ${new Date().getTime()}`)
    }

    test() {
        console.log("This is a test use case, @author MR.X")
    }
}
