export const getPartyOrientation = (answers: any) => {
    const leftRightAnswers: any = [];
    const topBottomAnswers: any = [];
    answers.forEach((answer: any) => {
        const agreeLevel = (answer.agreeLevel - 3) * 2.5;
        switch (answer.Question.position) {
        case "left":
            leftRightAnswers.push(agreeLevel * -1);
            break;
        case "right":
            leftRightAnswers.push(agreeLevel);
            break;
        case "top":
            topBottomAnswers.push(agreeLevel * -1);
            break;
        case "bottom":
            topBottomAnswers.push(agreeLevel);
            break;
        }
    });

    const lr = leftRightAnswers.reduce((a: any, b: any) => a + b, 0) / leftRightAnswers.length;
    const tb = topBottomAnswers.reduce((a: any, b: any) => a + b, 0) / topBottomAnswers.length;
    const leftRight = Math.floor(lr)
    const topBottom = Math.floor(tb)

    console.log("leftRight:", leftRight, "topBottom:", topBottom);

    return { leftRight, topBottom }
}