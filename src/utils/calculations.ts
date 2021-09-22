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

export const getPartyAgreePercentage = (partyAnswers: any, userAnwers: any): number => {
    const differences = [] as any

    partyAnswers.forEach((partyAnswer: any) => {
        const userAnswer = userAnwers.find((a: any) => a.Question.id === partyAnswer.Question.id)
        const disagreeLevel = Math.abs(partyAnswer.agreeLevel - userAnswer.agreeLevel)
        differences.push(disagreeLevel)
    });

    const disagreeTotal = differences.reduce((a: any, b: any) => a + b, 0) / differences.length
    const AgreePercentage = Math.round((100 - disagreeTotal * 25) * 100) / 100
    return AgreePercentage
}