package seebirakendustests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class addAndRemoveCandidate {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:3000/");
		selenium.start();
	}

	@Test
	public void testAddAndRemoveCandidate() throws Exception {
		selenium.open("");
		selenium.waitForPageToLoad("");
		selenium.click("link=Kandidatuur");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("id=inputPhone")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("id=inputPhone");
		selenium.type("id=inputPhone", "55503555");
		selenium.click("id=inputEmail");
		selenium.type("id=inputEmail", "taavi.ilp@eesti.ee");
		selenium.click("id=inputDescription");
		selenium.type("id=inputDescription", "Tõstan teil palku kõigil!");
		selenium.click("id=saveForm-btn");
		selenium.click("css=button.btn.dropdown-toggle");
		selenium.click("link=Harju- ja Raplamaa");
		selenium.click("css=#parties-dropdown > button.btn.dropdown-toggle");
		selenium.click("link=Uus Riik");
		selenium.click("id=submit_candidate");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (!selenium.isElementPresent("id=submit_candidate")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		verifyTrue(selenium.isTextPresent("Kandideerid järgmiste andmetega:"));
		selenium.click("id=remove_candidate");
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
