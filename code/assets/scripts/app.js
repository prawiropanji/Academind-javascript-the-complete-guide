class App {
  static init() {
    const activeProjects = new ProjectList('active');
    const finishedProjects = new ProjectList('finished');
    activeProjects.setSwitchHandler(
      finishedProjects.addProject.bind(finishedProjects)
    );
    finishedProjects.setSwitchHandler(
      activeProjects.addProject.bind(activeProjects)
    );
  }
}

class ProjectList {
  projects = [];

  constructor(type) {
    const projectItems = document.querySelectorAll(`#${type}-projects li`);
    this.type = type;
    for (const item of projectItems) {
      this.projects.push(
        new ProjectItem(item.id, this.switchProject.bind(this), this.type)
      );
    }
  }

  setSwitchHandler(switchHandler) {
    this.switchHandler = switchHandler;
  }

  switchProject(projectId) {
    this.switchHandler(
      // callback of otherInstance.addProject
      this.projects.find((project) => project.id === projectId)
    );
    this.projects = this.projects.filter((project) => project.id !== projectId);
  }

  addProject(project) {
    this.projects.push(project);

    const movedProject = DOMHelper.moveDOMEl(this.type, project.id);

    const switchButton = movedProject.querySelector('button:last-of-type');

    project.update(this.switchProject.bind(this));
    project.findSwitchButton(this.type);
  }
}

class ProjectItem {
  hasOpennedToolTip = false;

  constructor(projectId, updateProjectListHandler, type) {
    this.id = projectId;
    this.type = type;
    this.updateProjectListHandler = updateProjectListHandler;
    this.findMoreInfoButton();
    this.findSwitchButton(type);
  }

  update(updateProjectListFunction) {
    this.updateProjectListHandler = updateProjectListFunction;
    // this.findSwitchButton();
    this.type = this.type === 'active' ? 'finished' : 'active';
  }

  changeStateToolTip() {
    this.hasOpennedToolTip = this.hasOpennedToolTip ? false : true;
  }

  showMoreInfo() {
    if (this.hasOpennedToolTip) {
      return;
    }
    const hostElementId = this.id;

    const toolTip = new ToolTip(
      this.changeStateToolTip.bind(this),
      hostElementId
    );

    toolTip.create();

    this.changeStateToolTip();
  }

  findMoreInfoButton() {
    let projectListItemElement = document.getElementById(this.id);

    let moreInfoButton = projectListItemElement.querySelector(
      'button:first-of-type'
    );

    moreInfoButton.addEventListener('click', this.showMoreInfo.bind(this));
  }

  findSwitchButton(type) {
    let switchButton = document.querySelector(
      `#${this.id} button:last-of-type`
    );

    switchButton = DOMHelper.clearEventListener(switchButton);

    switchButton.textContent = type === 'active' ? 'Finish' : 'Activated';

    switchButton.addEventListener(
      'click',
      this.updateProjectListHandler.bind(null, this.id) // callback of switchProject
    );
  }
}

class DOMHelper {
  static moveDOMEl(targetProjectListType, projectId) {
    const projectListElement = document.querySelector(
      `#${targetProjectListType}-projects ul`
    );
    const projectElement = document.getElementById(projectId);

    projectListElement.appendChild(projectElement);

    return projectElement;
  }

  static clearEventListener(element) {
    const cloneElement = element.cloneNode(true);
    element.replaceWith(cloneElement);
    return cloneElement;
  }
}

class Component {
  constructor(hostElementId) {
    // this.hostElement = document.getElementById(hostElementId);
    this.hostElement = hostElementId
      ? document.getElementById(hostElementId)
      : document.body;
  }

  detach() {
    this.element.remove();
    this.changeStateInfo();
  }

  attach() {
    // this.hostElement.scrollIntoView({ behavior: 'smooth' });
    // this.hostElement.parentElement.scrollTo(0, 50);

    const yProjectList = this.hostElement.parentElement.offsetTop;
    const yprojectItem = this.hostElement.offsetTop;

    const yScroll = yprojectItem - yProjectList;

    this.hostElement.parentElement.scrollTo({
      top: yScroll,
      left: 0,
    });

    // this.hostElement.scrollIntoView();

    const projectElPosTop = this.hostElement.offsetTop;
    const projectElPosLeft = this.hostElement.offsetLeft;
    const projectElHeight = this.hostElement.offsetHeight;
    const hostElementScrolling = this.hostElement.parentElement.scrollTop;

    console.log(hostElementScrolling);

    this.element.style.position = 'absolute';
    this.element.style.top = `${
      projectElPosTop + projectElHeight - 10 - hostElementScrolling
    }px`;
    this.element.style.left = `${projectElPosLeft + 16}px`;
    this.element.style.position = 'absolute';

    this.hostElement.appendChild(this.element);
  }
}

class ToolTip extends Component {
  constructor(changeStateInfoFn, hostElementId) {
    super(hostElementId);
    this.changeStateInfo = changeStateInfoFn;

    this.text = this.hostElement.dataset.extraInfo;
  }

  create() {
    const infoElement = document.createElement('div');
    infoElement.className = 'card';
    // infoElement.textContent = this.text;
    const toolTipFragment = document.getElementById('tooltip-template').content;
    const toolTipFragmentCopy = document.importNode(toolTipFragment, true);
    toolTipFragmentCopy.querySelector('p').textContent = this.text;
    infoElement.append(toolTipFragmentCopy);

    infoElement.addEventListener('click', this.detach.bind(this));
    this.element = infoElement;
    this.attach();
  }
}

App.init();
