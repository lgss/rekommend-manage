from test_bootstrap import JerichoTest
import unittest
import time
import random
import json

class EditorTests(JerichoTest):

    def test_example(self):
        self.browser.get(self.env["root"])

        heading = self.browser.find_element_by_tag_name('h1')
        self.assertEqual(heading.text, 'Rekommend Management', 'Title Check')