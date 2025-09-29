from setuptools import setup, find_packages

with open("README.md", "r", encoding="utf-8") as fh:
    long_description = fh.read()

setup(
    name="sky-scanner",
    version="1.0.0",
    author="Sky Scanner Team",
    description="A basic port scanner for cybersecurity professionals and network administrators",
    long_description=long_description,
    long_description_content_type="text/markdown",
    url="https://github.com/VandyckLN/Sky-scanner-",
    py_modules=["sky_scanner"],
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Topic :: Security",
        "Topic :: System :: Networking",
        "Intended Audience :: System Administrators",
        "Intended Audience :: Information Technology",
    ],
    python_requires=">=3.6",
    entry_points={
        "console_scripts": [
            "sky-scanner=sky_scanner:main",
        ],
    },
)