import unittest
import time
import random
import selenium
import json
import inspect
import platform
import os

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

class EditorTests(unittest.TestCase):
    ## Definitions
    ROOT = os.getenv('ROOT')

    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument('--disable-gpu')
        chrome_options.add_argument('--window-size=1600x1000')
        chrome_options.add_argument('--disable-dev-shm-usage')
        chrome_options.add_argument('--no-sandbox')
        chrome_options.add_argument('--no-zygote')
        chrome_options.add_argument('--hide-scrollbars')
        chrome_options.add_argument('--enable-logging')
        chrome_options.add_argument('--log-level=0')
        chrome_options.add_argument('--v=99')
        chrome_options.add_argument('--ignore-certificate-errors')
        if platform.system() != "Windows":
            chrome_options.add_argument('--headless')
            chrome_options.add_argument('--single-process')
        self.browser = webdriver.Chrome(options=chrome_options)
        self.addCleanup(self.browser.quit)
        
    ## Utility functions

    def test_one(self):
        self.browser.get(self.ROOT)
        heading = self.browser.find_element_by_tag_name('h1')
        self.assertEqual(heading.text, 'Rekommend Management', 'Title check')

    def test_two(self):
        self.browser.get(self.ROOT)
        tab = self.browser.find_element_by_class_name('v-tab--active')
        self.assertEqual(tab.text, 'GENERAL', 'General tab check')        