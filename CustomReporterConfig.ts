import {
  Reporter,
  Suite,
  FullConfig,
  TestCase,
  TestResult,
  TestStep,
  TestError,
  FullResult,
} from "@playwright/test/reporter";

export default class CustomReporterConfig implements Reporter {
  onBegin(config: FullConfig, suite: Suite) {
    console.log(
      `Starting the run with ${suite.title} ${suite.allTests().length} tests`
    );
  }

  onEnd(fullresult: FullResult) {
    console.log(`Finished the run: ${fullresult.status}`);
  }
  onTestBegin(test: TestCase): void {
    console.log(`Test Case Started : ${test.title}`);
  }
  onTestEnd(test: TestCase, result: TestResult): void {
    console.log(
      `Test Case Completed : ${test.title} Status : ${result.status}`
    );
    console.log(
      `Total Duration Taken Test Case : ${test.title} Duration : ${result.duration}ms`
    );
  }
  onStepBegin(test: TestCase, result: TestResult, step: TestStep): void {
    if (step.category === `test.step`) {
      console.log(`Executing Step : ${step.title}`);
    }
  }

  onError(error: TestError): void {
    console.log(error.message);
  }
}
