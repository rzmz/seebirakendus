package seebirakendustests;

import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import static org.junit.Assert.*;
import java.util.regex.Pattern;

public class searchCandidate {
	private Selenium selenium;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://localhost:3000/");
		selenium.start();
	}

	@Test
	public void testSearchCandidate() throws Exception {
		selenium.open("/tulemused");
		selenium.click("link=Nimekirjad");
		for (int second = 0;; second++) {
			if (second >= 60) fail("timeout");
			try { if (selenium.isElementPresent("id=searchfield")) break; } catch (Exception e) {}
			Thread.sleep(1000);
		}

		selenium.click("id=searchfield");
		selenium.type("id=searchfield", "aivar kuusk");
		selenium.click("id=search-btn");
		selenium.click("link=Kuusk");
		selenium.waitForPageToLoad("30000");
		verifyTrue(selenium.isTextPresent(""));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
}
